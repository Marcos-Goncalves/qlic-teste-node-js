import { FastifyRequest } from "fastify";
import CreateTaskService from "../services/CreateTaskService";
import FindAllTasksService from "../services/FindAllTasksService";
import { z } from "zod";

class TaskController {

    async createTask({ title, description, status }: { title: string; description: string; status: string }) {
        try {
            const newTask = await CreateTaskService.createTask({ title, description, status });
            return newTask;
        } catch (error) {
            const errorMessage = (error as Error).message;
            throw new Error(errorMessage);
        }
    }

    async findAll(requestQuery: FastifyRequest['query']) {

        const findAllTasksSchema = z.object({
            status: z.string().optional()
        });

        try {
            const { status } = findAllTasksSchema.parse(requestQuery);
            const tasks = await FindAllTasksService.findAll(status);
            return tasks;
        } catch (error) {
            const errorMessage = (error as Error).message;
            throw new Error(errorMessage);
        }
    }
}


export default new TaskController();