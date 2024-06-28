![Código Certo Coders](https://utfs.io/f/3b2340e8-5523-4aca-a549-0688fd07450e-j4edu.jfif)

# 📚 Trilha Inicial BackEnd Jr

## Introdução
Este projeto tem como objetivo desenvolver uma API RESTful para gerenciamento de tarefas, proporcionando funcionalidades de CRUD (Create, Read, Update, Delete) de tarefas, autenticação de usuários e armazenamento dos dados em um banco de dados.

## Objetivos
- Criar uma API que permita CRUD de tarefas.
- Implementar autenticação de usuários.
- Utilizar um banco de dados SQLite para armazenar as tarefas.
- Documentar todo o processo e apresentar as conclusões.

## Requisitos Funcionais
- **Criar Tarefa**: Endpoint para criar uma nova tarefa.
- **Listar Tarefas**: Endpoint para listar todas as tarefas.
- **Atualizar Tarefa**: Endpoint para atualizar uma tarefa existente.
- **Deletar Tarefa**: Endpoint para deletar uma tarefa existente.

## Autenticação de Usuários
- **Registro de Usuário**: Endpoint para registrar um novo usuário.
- **Login de Usuário**: Endpoint para autenticar um usuário e gerar um token JWT.
- **Proteção de Rotas**: Garantir que apenas usuários autenticados possam acessar os endpoints de tarefas.

## Documentação
Toda a documentação pode ser acessada no link abaixo, que encaminhará para o Swagger:
```
https://gerenciadordetarefas.up.railway.app/api-docs/
```
## Deploy
Foi utilizada a ferramenta Railway para a realização do deploy.

## Funcionamento
Temos CRUD para usuários e CRUD para tarefas. Todas as opções de CRUD de tarefas devem ser acessadas somente após o login do usuário. As rotas estão divididas em Usuário, Tarefas e Autenticação.

## Instalação e Configuração
Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. Clone o repositório:
    ```
    git clone https://github.com/seuusuario/TrilhaBackEndJR.git
    ```
2. Navegue até o diretório do projeto:
    ```
    cd TrilhaBackEndJR
    ```
3. Instale as dependências:
    ```
    npm install
    ```
4. Configure o arquivo `.env` com as variáveis de ambiente necessárias:
    ```
    DATABASE_URL=sqlite:./database.sqlite
    JWT_SECRET=your_secret_key
    ```

5. Execute as migrações do banco de dados:
    ```
    npx sequelize db:migrate
    ```

6. Inicie o servidor:
    ```
    npm start
    ```
#### Estrutura do Projeto:
   ```plaintext
   project-root/
   │
   ├── src/
   │   ├── config/
   │   ├── controllers/
   │   ├── models/
   │   ├── middlewares/
   │   ├── database/
   │   ├── routes.js
   │   ├── server.js
   │   ├── swagger.json
   │   └── app.js
   │
   ├── .env
   ├── .gitignore
   ├── README.md
   └── package.json
   ```

## Autenticação
Esta seção trata da autenticação do usuário, incluindo criação de conta, login e logout.

### Criar Usuário - ENDPOINT: `POST /users`
Para a criação de um usuário, acesse a rota:
Passe os seguintes parâmetros:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
### Login - ENDPOINT: `POST /users/login`:
Para login voce deve existir ja no banco de dados, se não existir crie uma conta antes, e acessar a rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Authentication/post_users_login`, passando no corpo da requisição:
```json
{
  "email": "string",
  "password": "string"
}
```
Ela ira retornar os dados do usuário e o token de autenticação. É necessário coloca-lo na opção `Authorize`, que aparece no canto superior direito da página:

![image](https://github.com/JulliaFernandes/TrilhaBackEndJR-JUN15/assets/118275249/d2869a55-7fc8-4a97-83e8-9906c68652e2)

Ao clicar na opção, no campo `Values` que aparece cole o token que foi retornado e clique em Authorize, sem esse token não é possivel realizar o CRUD de tarefas e nem a alteração de dados do usuário.
![image](https://github.com/JulliaFernandes/TrilhaBackEndJR-JUN15/assets/118275249/4f7915f6-d20f-4efe-bd4b-0b4d5d90aeee)


### Logout - ENDPOINT: `POST /users/logout/{userId}`:
Essa opção foi criada no intuito de usuário se deslogar da sua conta e não ser possível de ser realizadas alterações em seus dados e tarefas se caso ele não estiver logado, acesse a rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Authentication/post_users_logout__userId_` e passe o ID do usuário que deseja deslogar a conta. É necessáio que o token de autorização ja esteja colocado.

## Usuários:
Nesta seção, o usuário pode alterar seus dados, deletar sua conta, visualizar todos os usuários cadastrados e atualizar informações.

### Visualização de todos os usuários cadastrados - ENDPOINT: `GET /users`:
Acesse a rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Users/get_users` e execute que ira listar todos os usuário se existirem.

### Atualizar um usuário - ENDPOINT: `PUT /users/{userId}`:
Com acesso a essa rota voce pode alterar informações do usuário como email, nome de usuário e a senha.

Acesse a rota e passe o Id do usuário que deseja alterar e as mudanças a serem feitas no corpo da requisição. Rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Users/put_users__userId_`
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
É necessário que o token ja esteja autorizado para realizar essa função.

### Deletar usuário - ENDPOINT: `DELETE /users/{userID}`:
Para excluir sua conta, passe o ID do usuário que deseja deletar e esteja logado com o token autenticado. Acesse a rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Users/delete_users__userId_`

## Tarefas:
As funções CRUD de tarefas requerem que o usuário esteja logado e com o token de ativação.

### Listar todas as tarefas - ENDPOINT: `GET /users/{userID}/tasks`:
Para conseguir vizualizar todas as suas tarefas, basta ir na rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Tasks/get_users__userId__tasks` e informar o número do Id do usuário que deseja saber as tarefas.

### Criar tarefa - ENDPOINT: `POST /users/{userID}/tasks`:
Para essa função, voce pode acessar a rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Tasks/post_users__userId__tasks` e cadastrar uma nova tarefa. É necessário informar o Id do usuário que deseja cadastrar essa tarefas e passar no corpo da requisição os seguintes parametros:
```json
{
  "title": "string",
  "description": "string"
}
```
Ela ira retorna o numero do id da tarefa que voce acabou de criar.


### Atualizar tarefa - ENDPOINT: `PUT /users/{userID}/tasks/{taskId}`:
Para isso vá à rota: `https://gerenciadordetarefas.up.railway.app/api-docs/#/Tasks/put_users__userId__tasks__taskId_` e informe o numéro do ID do usuário e o ID da tarefa, logo apos isso passe no corpo da requisão as mudanças a serem feitas nos seguintes campos:
```json
{
  "title": "string",
  "description": "string",
  "status": "string"
}
```

### Deletar tarefa - ENDPOINT: `DELETE /users/{userID}/tasks/{taskId}`:
Para a exclusão de alguma tarefa, basta passar o Id do usuário e o Id da tarefa que deseja apagar.

### Tecnologias:
Foram usadas as seguintes ferrametas para a execução do programa:
- NodeJS
- Express
- SQLite
- Bcrypt
- Dotenv
- JWT
- Swagger-ui

🌐 **Contato:**
- Email: julliafernandesf41@gmail.com
