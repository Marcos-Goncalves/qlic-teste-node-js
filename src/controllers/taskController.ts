import createTaskService from "../services/createTaskService";
import { FastifyRequest, FastifyReply } from "fastify";

class taskController {

    async createTask(request: FastifyRequest, reply: FastifyReply) {
        const { title, description } = request.body as { title: string; description: string };

        const createdTask = await createTaskService.CreateTask({ title, description });
        reply.code(201).send(createdTask);
    }

}


export default new taskController();