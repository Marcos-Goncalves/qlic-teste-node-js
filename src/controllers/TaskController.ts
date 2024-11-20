import { FastifyReply, FastifyRequest } from "fastify";
import CreateTaskService from "../services/CreateTaskService";
import FindAllTasksService from "../services/FindAllTasksService";
import { z } from "zod";

class TaskController {

    async createTask(requestBody: FastifyRequest['body'], reply: FastifyReply) {
        const createTaskSchema = z.object({
            title: z.string(),
            description: z.string(),
            status: z.string().transform(value => value.trim() === '' ? 'pendente' : value).default('pendente')
        })

        try {
            const { title, description, status } = createTaskSchema.parse(requestBody);
            const newTask = await CreateTaskService.createTask({ title, description, status });
            return reply.code(201).send({
                message: 'Tarefa criada com sucesso!'
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.code(400).send({
                    message: error.errors[0].message
                });
            }

            return reply.code(500).send({
                message: 'Erro interno no servidor'
            });
        }
    }

    async findAll(requestQuery: FastifyRequest['query'], reply: FastifyReply) {
        const findAllTasksSchema = z.object({
            status: z.string().optional()
        });

        try {
            const { status } = findAllTasksSchema.parse(requestQuery);
            const tasks = await FindAllTasksService.findAll(status);
            return reply.code(200).send(tasks);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.code(400).send({
                    message: error.errors[0].message
                });
            }

            return reply.code(500).send({
                message: 'Erro interno no servidor'
            });
        }
    }
}


export default new TaskController();