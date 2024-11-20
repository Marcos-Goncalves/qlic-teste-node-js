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

    fastify.put('/tasks/:id', async (request, reply) => {
        const updatedTask = await TaskController.updateTask(request.params, request.body, reply);
        return reply.send(updatedTask);
    });
}

export default taskRoutes;