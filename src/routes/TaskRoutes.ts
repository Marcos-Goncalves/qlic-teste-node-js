import { FastifyInstance } from "fastify";
import TaskController from "../controllers/TaskController";

async function taskRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks', async (request, reply) => {
        const allTasks = await TaskController.findAll(request.query, reply);
        return reply.send(allTasks);
    });

    fastify.post('/tasks', async (request, reply) => {
        const newTask = await TaskController.createTask(request.body, reply);
        return reply.send(newTask);
    });

    // Adicione outras rotas conforme necessário
}

export default taskRoutes;