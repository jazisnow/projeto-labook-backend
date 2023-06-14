
import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPost.dto";
import { LikeOrDislikePostInputDTO, LikeOrDislikePostOutputDTO } from "../dtos/post/likeOrDislikePost.dto";
import { ForbiddenError } from "../erros/ForbiddenError";
import { NotFoundError } from "../erros/NotFoundError";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { Post, likeDislikeDB, POST_LIKE } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const id = this.idGenerator.generate();

    const post = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    );

    const postDB = post.toDBModel();
    await this.postDatabase.insertPost(postDB);

    const output: CreatePostOutputDTO = undefined;

    return output;
  };

  public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const PostDBWithCreatorName = await this.postDatabase.getPostsWithCreatorsName();

    const posts = PostDBWithCreatorName.map((PostDBWithCreatorName) => {
      const post = new Post(
        PostDBWithCreatorName.id,
        PostDBWithCreatorName.content,
        PostDBWithCreatorName.likes,
        PostDBWithCreatorName.dislikes,
        PostDBWithCreatorName.created_at,
        PostDBWithCreatorName.updated_at,
        PostDBWithCreatorName.creator_id,
        PostDBWithCreatorName.creator_name
      );
      return post.toBusinessModel();
    });
    const output: GetPostsOutputDTO = posts;

    return output;
  };

  public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
    const { content, token, idToEdit } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDatabase.findPostById(idToEdit);

    if (!postDB) {
      throw new NotFoundError("Post com essa id não existe");
    }

    if (payload.id !== postDB.creator_id) {
      throw new ForbiddenError("Somente quem criou o post pode editá-lo");
    }

    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.creator_id,
      payload.name
    );

    post.setContent(content);

    const updatedPostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatedPostDB);

    const output: EditPostOutputDTO = undefined;

    return output;
  };

  public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDatabase.findPostById(idToDelete);

    if (!postDB) {
      throw new NotFoundError("Post com essa id não existe");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError("Somente quem criou o post pode deletá-lo");
      }
    }

    await this.postDatabase.deletePostById(idToDelete);

    const output: DeletePostOutputDTO = undefined;

    return output;
  };

  public likeOrDislikePost = async (
    input: LikeOrDislikePostInputDTO
  ): Promise<LikeOrDislikePostOutputDTO> => {
    const { token, like, postId } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDBWithCreatorName = await this.postDatabase.findPostWithCreatorNameById(postId);

    if (!postDBWithCreatorName) {
      throw new NotFoundError("Post com essa id não existe");
    }

    const post = new Post(
      postDBWithCreatorName.id,
      postDBWithCreatorName.content,
      postDBWithCreatorName.likes,
      postDBWithCreatorName.dislikes,
      postDBWithCreatorName.created_at,
      postDBWithCreatorName.updated_at,
      postDBWithCreatorName.creator_id,
      postDBWithCreatorName.creator_name
    );

    const likeSQLite = like ? 1 : 0;

    const likeDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: likeSQLite,
    };

    const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB);

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislike();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislike();
        post.addLike();
      }
    } else {
      await this.postDatabase.insertLikeDislike(likeDislikeDB);
      like ? post.addLike() : post.addDislike();
    }

    const updatedPostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatedPostDB);

    const output: LikeOrDislikePostOutputDTO = undefined;

    return output;
  };
}



