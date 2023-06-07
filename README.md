<h1  align="center">API Labook</h1> 

## Sobre esse projeto 📖
Labook API A Labook API é uma aplicação que oferece uma plataforma de rede social, permitindo que os usuários se conectem e interajam. Esta API foi desenvolvida seguindo as melhores práticas e utiliza uma variedade de tecnologias para fornecer uma experiência segura e eficiente para os usuários do Labook.

## Funcionalidades 📋
A Labook API oferece uma coleção de endpoints que permitem gerenciar usuários, posts e curtidas na plataforma de rede social. Abaixo estão detalhes das principais funcionalidades disponíveis:

**`SignUp`**: Realiza o cadastro de um novo usuário no sistema.

**`Login`**: Retorna um token de autenticação após verificar as credenciais do usuário.

**`CreatePost`**: Permite a criação de um novo post associado ao ID do usuário.

**`GetPost`**:Recebe um token de autenticação e retorna todos os posts criados pelo usuário.

**`EditPost`**: Permite a edição de um post existente.

**`DeletePost`**: Permite excluir um post existente com base no ID.

**`LikeOrDislike`**: Permite que um usuário dê um like ou dislike em um post de outro usuário.

Esses endpoints fornecem uma ampla gama de funcionalidades para os desenvolvedores e outras partes interessadas acessarem e interagirem com a Labook API por meio de chamadas de API bem definidas.

A documentação completa está nesse link:


## Tecnologias utilizadas 💾

A Labook API foi desenvolvida utilizando as seguintes tecnologias:

NodeJS: plataforma de desenvolvimento backend baseada em JavaScript.

TypeScript: superset do JavaScript que traz recursos adicionais de tipagem estática.

Express: framework web utilizado para criar aplicativos e APIs em NodeJS.

SQLite: linguagem de consulta estruturada e sistema de gerenciamento de banco de dados relacionais.

Knex: biblioteca para construção de consultas SQL de forma simples e intuitiva.

Programação Orientada a Objetos (POO): paradigma de programação que organiza o código em objetos e classes.

Arquitetura em camadas: abordagem que divide a aplicação em camadas para uma melhor organização e manutenção do código.

Geração de UUID: criação de identificadores únicos universalmente.

Geração de hashes: processo de converter dados em uma sequência alfanumérica de tamanho fixo.

Autenticação e autorização: mecanismos utilizados para garantir a segurança e controle de acesso aos recursos da aplicação.

Roteamento: definição de rotas para acessar diferentes recursos da API.

Postman: plataforma para testar e documentar APIs.

Banco de dados: armazenamento de informações relacionais utilizadas pela aplicação.


## Instalação 🛠️

Para utilizar a API Labook em seu ambiente local, siga as instruções abaixo para a instalação e configuração adequadas.

Pré-requisitos

Antes de iniciar a instalação, verifique se o seu sistema possui os seguintes pré-requisitos:

-   Node.js (versão 14 ou superior)
-   NPM (Node Package Manager) ou Yarn

Passo a passo✅

1.  Faça o download ou clone o repositório da API Labook em seu ambiente local.
    
2.  Abra o terminal e navegue até o diretório raiz do projeto.
    
3.  Execute o seguinte comando para instalar as dependências necessárias:
    
    ```
    `npm install` 
    
    ```
    
    ou, se estiver utilizando o Yarn:
    
    ```
    `yearn` 
    
    ```
    
4.  Crie um arquivo  `.env`  na raiz do projeto e defina as seguintes variáveis de ambiente:
    
    ```
    DB_HOST=seu_host,
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=seu_banco_de_dados
    JWT_SECRET=sua_chave_secreta
    
    ```
    
    Certifique-se de substituir os valores  `seu_host`,  `seu_usuario`,  `sua_senha`  e  `seu_banco_de_dados`  pelas informações correspondentes ao seu banco de dados.
    
    A variável  `JWT_SECRET`  é utilizada para a geração de tokens JWT e pode ser definida como uma string de sua escolha.
    
5.  Execute o seguinte comando para criar as tabelas no banco de dados:
    
    `npm run create-tables`
    
    ou, se estiver utilizando o Yarn:  `yarn create-tables`
    
6.  Finalmente, inicie a API Labook executando o seguinte comando:
    
    `npm start`
    
    ou, com o Yarn:
    
    `yarn start`
    
    A API estará disponível no endereço  `http://localhost:3000`.
    

Agora você pode utilizar a API Labook para criar, editar, excluir e interagir com publicações e usuários na rede social Labook. Certifique-se de consultar a documentação dos endpoints para obter mais detalhes sobre como utilizar cada funcionalidade.

## Status do Projeto  🚧
