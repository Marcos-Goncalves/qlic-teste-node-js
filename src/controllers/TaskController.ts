import { FastifyReply, FastifyRequest } from "fastify";
import CreateTaskService from "../services/CreateTaskService";
import FindAllTasksService from "../services/FindAllTasksService";
import UpdateTaskService from "../services/UpdateTaskService";
import { z } from "zod";
import axios from "axios";
import { AppError } from "../errors/AppError";
import { StatusEnum } from "../services/FindAllTasksService";

class TaskController {

    async createTask(requestBody: FastifyRequest['body'], reply: FastifyReply) {
        const createTaskSchema = z.object({
            title: z.string(),
            description: z.string(),
            status: z.string().transform(value => value.trim() === '' ? 'pendente' : value).default('pendente')
        })

        try {
            const { title, description, status } = createTaskSchema.parse(requestBody);
            await CreateTaskService.createTask({ title, description, status });
            return reply.code(201).send({
                message: 'Tarefa criada com sucesso!'
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new AppError(error.errors[0].message, 400);
            }

            throw error;
        }
    }

    async findAll(requestQuery: FastifyRequest['query'], reply: FastifyReply) {
        const findAllTasksSchema = z.object({
            status: z.enum([StatusEnum.CONCLUIDO, StatusEnum.EM_ANDAMENTO, StatusEnum.PENDENTE]).optional(),
            id: z.string().transform(value => Number(value)).optional(),
            page: z.string().transform(value => Number(value)).optional(),
            limit: z.string().transform(value => Number(value)).optional()
        });

        try {
            const { status, id, page, limit } = findAllTasksSchema.parse(requestQuery);
            const tasks = await FindAllTasksService.findAll({ status, id, page, limit });
            return reply.code(200).send(tasks);
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new AppError(error.errors[0].message, 400);
            }

            throw error;
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

            await UpdateTaskService.updateTask(id, { title, description, status });
            return reply.code(200).send({
                message: 'Tarefa atualizada com sucesso!'
            });
        } catch (error) {
            throw error;
        }
    }

    async findUsers(requestParams: FastifyRequest['params'], fastify: FastifyReply) {

        const usersSchema = z.object({
            id: z.string()
                .transform(value => parseInt(value))
                .refine(value => !isNaN(value) && value > 0, {
                    message: 'O id deve ser um número válido e maior que zero'
                })
                .optional()
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

            if (error instanceof z.ZodError) {
                throw new AppError(error.errors[0].message, 400);
            }

            if (axios.isAxiosError(error)) {
                const status = error.response?.status || 500;
                const message = error.response?.data?.message || 'Erro ao buscar dados da API';
                throw new AppError(message, status);
            }

            throw error;
        }
    }
}


export default new TaskController();