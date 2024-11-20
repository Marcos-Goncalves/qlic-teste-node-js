import { FastifyReply, FastifyRequest } from "fastify";
import CreateTaskService from "../services/CreateTaskService";
import FindAllTasksService from "../services/FindAllTasksService";
import UpdateTaskService from "../services/UpdateTaskService";
import { z } from "zod";
import axios from "axios";

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

    async updateTask(requestParams: FastifyRequest['params'], requestBody: FastifyRequest['body'], reply: FastifyReply) {

        const updateTaskSchema = z.object({
            title: z.string(),
            description: z.string(),
            status: z.string()
        });

        const paramsSchema = z.object({
            id: z.string().transform(value => parseInt(value))
        });

        try {
            const { id } = paramsSchema.parse(requestParams);
            const { title, description, status } = updateTaskSchema.parse(requestBody);
            const validateTask = await UpdateTaskService.validateTask(id);

            if (!validateTask) {
                return reply.code(404).send({
                    message: 'Tarefa não encontrada!'
                })
            }

            await UpdateTaskService.updateTask(id, { title, description, status });
            return reply.code(200).send({
                message: 'Tarefa atualizada com sucesso!'
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

    async findUsers(requestParams: FastifyRequest['params'], fastify: FastifyReply) {
        const usersSchema = z.object({
            id: z.string().transform(value => parseInt(value)).optional()
        });

        try {
            const { id } = usersSchema.parse(requestParams);
            const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

            if (!id) {
                const users = await axios.get(API_BASE_URL);
                return users.data;
            }

            const users = await axios.get(`${API_BASE_URL}/${id}`);
            return users.data;
        } catch (error) {
            return fastify.code(404).send({
                message: 'Erro ao buscar usuários'
            });
        }
    }
}


export default new TaskController();