import { FastifyInstance } from "fastify";
import TaskController from "../controllers/TaskController";
import { authenticate } from "../middleware/authMiddleware";

async function taskRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks',  { preHandler: [authenticate] }, async (request, reply) => {
        const allTasks = await TaskController.findAll(request.query, reply);
        return reply.send(allTasks);
    });

    fastify.post('/tasks', { preHandler: [authenticate] }, async (request, reply) => {
        const newTask = await TaskController.createTask(request.body, reply);
        return reply.send(newTask);
    });

    fastify.put('/tasks/:id', { preHandler: [authenticate] }, async (request, reply) => {
        const updatedTask = await TaskController.updateTask(request.params, request.body, reply);
        return reply.send(updatedTask);
    });

    fastify.get('/tasks/users/:id?', { preHandler: [authenticate] }, async (request, reply) => {
        const taskUsers = await TaskController.findUsers(request.params, reply);
        return reply.send(taskUsers);
    });
}

export default taskRoutes;