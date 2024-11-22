import { FastifyInstance } from "fastify";
import UserController from "../controllers/UserController";

async function UserRoutes (fastify: FastifyInstance) {
	//Cria um novo usu´ario
	fastify.post('/user/register', async (request, reply) => {
		const newUser = await UserController.create(request.body, reply);
		return reply.send(newUser);
	});

	//Login de usuário
	fastify.post('/user/login', async (request, reply) => {
		const user = await UserController.login(request.body, reply);
		return reply.send(user);
	});
	
}

export default UserRoutes;