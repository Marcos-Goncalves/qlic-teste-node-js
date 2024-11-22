
<h1 align="center" style="font-weight: bold;">API REST 💻</h1>

<p align="center">
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
  <b>This is a REST API, using basic concepts of structure and best practices.</b>
</p>

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- [NodeJS](https://nodejs.org/pt)
- [Docker/Docker-Compose](https://www.docker.com/)
- Tool for testing the API (Postman, Insomnia, etc)

<h3>Cloning</h3>

```bash
git clone https://github.com/Marcos-Goncalves/qlic-teste-node-js.git
cd qlic-teste-node-js
```

<h3> Environment Variables</h2>

In the project files, there is already a `.env.example` file. Just follow it to create and configure the file.

Example:
```yaml
DATABASE_URL="mysql://root:root@localhost:3306/qlic?schema=public"
JWT_SECRET=supersecret
PORT=3344
```

<h3>Starting</h3>

After cloning the project, follow these steps to make the project work.

```bash
npm install
``````

Configure the environment variables.
```bash
cp .env.example .env
``````

Start the Docker services.
```bash
docker-compose up -d
``````

Run the database migrations.
```bash
npx prisma migrate dev
``````

Start the server.
```bash
npm run dev
``````

<h2 id="routes">📍 API Endpoints</h2>

​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /tasks</kbd>     | Returns the registered tasks, with the option to filter by status and/or ID, and with the option to paginate (page and/or limit).
| <kbd>POST /tasks</kbd>     | Creates a new task by providing a title, description, and an optional status (default: pendente).
| <kbd>PUT /tasks/:</kbd>     | Updates information for a specific task.
| <kbd>GET /tasks/users</kbd>     | Returns a list of fake users.
| <kbd>GET /user/register</kbd>     | Registers a new user by providing name, email, and password.
| <kbd>GET /user/login</kbd>     | Logs the user in.
---
<h3>GET /tasks</h3>

**REQUEST** - All query parameters are optional, and the possible statuses are "pendente", "em andamento", or "concluido".
```http
GET http://localhost:3333/tasks?status=concluido&id=1&page=2&limit=2
```

**RESPONSE** - This case: http://localhost:3333/tasks?page=2&limit=2
```json
{
    "tasks": [
        {
            "id": 3,
            "title": "Atividade 03",
            "status": "em andamento",
            "description": "Realizar atividade 03 em determinada ordem",
            "createdAt": "2024-11-20T15:01:24.669Z",
            "updatedAt": "2024-11-20T15:01:24.669Z"
        },
        {
            "id": 4,
            "title": "Atividade 04",
            "status": "concluido",
            "description": "Realizar atividade 04 em determinada ordem",
            "createdAt": "2024-11-20T15:02:51.442Z",
            "updatedAt": "2024-11-20T15:02:51.442Z"
        }
    ],
    "total": 2,
    "page": 2
}
```
---
<h3>POST /tasks</h3>

**REQUEST** - Of all the request body parameters, status is optional and defaults to "pendente". However, it can take one of the following values: "pendente", "em andamento", or "concluido"
```json
{
    "title": "Atividade 07",
    "description": "Realizar atividade 07 em determinada ordem",
    "status": "em andamento"
}
```

**RESPONSE**
```json
{
    "message": "Tarefa criada com sucesso!"
}
```
---
<h3>PUT /tasks/:</h3>

**REQUEST** - http://localhost:3333/tasks/7 - *The status can only accept one of the three: "pendente", "em andamento", or "concluido"*
```json
{
    "title": "Atividade 07 (edit)",
    "description": "Realizar atividade 07 em determinada ordem (edit)",
    "status": "concluido"
}
```

**RESPONSE**
```json
{
    "message": "Tarefa atualizada com sucesso!"
}
```
---
<h3>GET /tasks/users</h3>

**REQUEST** - If an ID is provided in the route, it returns the user; if not, it returns the full list.
```http
GET http://localhost:3333/tasks/users/1
```

**RESPONSE** - This case: http://localhost:3333/tasks/users/1
```json
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
}
```
---
<h3>POST /user/register</h3>

**REQUEST**
```json
{
    "name": "example",
    "email": "example@gmail.com",
    "password": "example"
}
```

**RESPONSE**
```json
{
    "message": "Usuário criado com sucesso!"
}
```
---
<h3>POST /user/login</h3>

**REQUEST**
```json
{
    "email": "example@gmail.com",
    "password": "example"
}
```

**RESPONSE**
```json
{
    "message": "Usuário logado com sucesso!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtM3Q5d3JoNDAwMDBoZnd4NWU5d2p2Mm8iLCJuYW1lIjoiZXhhbXBsZSIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR2QnRQVHkxbEJwV3d4Wlo0ODlHc3MuTXVBY3VmdU9lalZBY1BTQ05BWkFlNWdVOFZ2OFpVZSIsImNyZWF0ZWRBdCI6IjIwMjQtMTEtMjJUMjE6NDg6NDEuMzY4WiIsInVwZGF0ZWRBdCI6IjIwMjQtMTEtMjJUMjE6NDg6NDEuMzY4WiIsImlhdCI6MTczMjMxMjE2MywiZXhwIjoxNzMyMzk4NTYzfQ.657wh5PONGUQb2oTfO3lp-pBPWr3CNFot6z6gpR7oIE"
}
```

**Except for the user registration and login routes, all other routes are protected by token.**