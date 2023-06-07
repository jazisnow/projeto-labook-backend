-- Active: 1685222300209@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
  -- tipo NORMAL e senha = jaziel123
	('u001', 'Jaziel', 'jazibury@email.com', '$2a$12$0NubfvYWcoh/YxEv2VdvUulgc84lrA4lIQKOa.kSMSvgWFGGOtQR2', 'NORMAL'),

  -- tipo NORMAL e senha = helena456
	('u002', 'Helena', 'lenabury@email.com', '$2a$12$ehFUXzs3HT1ln9vYrUZdyOWR6nwOCVj6SRe5sASADyiPuQTK.fGGi', 'NORMAL'),

  -- tipo ADMIN e senha = astrodev99
	('u003', 'Luiz', 'lizsouza@email.com', '$2a$12$UIg8sqTG7wS1T4EPyeJGBO3mLIJyLzQ.iYkUleOivgMQ3jx1Y7WfO', 'ADMIN');

  SELECT * FROM users;

  CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

INSERT INTO posts (id, creator_id, content)
VALUES
('p001', 'u001', 'Eu sou inevitavel'),
('p002', 'u002', 'Não concordo'),
('p003', 'u003', 'Eu tbm não');

SELECT * FROM posts;

CREATE Table likes_dislikes(
  user_id TEXT NOT NULL,
  posts_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN Key (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
  FOREIGN Key (posts_id) REFERENCES posts (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE  
);

INSERT INTO likes_dislikes (user_id, posts_id, like)
VALUES
('u003', 'p002', 1),
('u003', 'p001', 0),
('u002', 'p003', 1),
('u002', 'p001', 0),
('u001', 'p002', 0),
('u001', 'p003', 0);

UPDATE posts
SET dislikes = 2
WHERE id = 'p001';

UPDATE posts
SET likes = 1, dislikes = 1
WHERE id = 'p002';

UPDATE posts 
SET likes = 1, dislikes = 1
WHERE id = 'p003';



