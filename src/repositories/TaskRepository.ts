import prisma from "../config/database";
import { TaskOptions } from "../services/FindAllTasksService";
import { Task as TaskFindAll } from "../services/FindAllTasksService";

interface Task {
    title: string;
    description: string;
    status: string;
}

class TaskRepository {
    async create(task: Task) {
        return await prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                status: task.status
            }
        });
    }

    async findAll(options?: TaskOptions) {
        const page = options?.page ?? 1;
        const take = options?.limit ?? 5;

        return await prisma.task.findMany({
            where: {
                ...(options?.status && { status: options.status }),
                ...(options?.id && { id: Number(options.id) })
            },skip: (page - 1) * take,
            take
        }) as TaskFindAll[];
    }

    async update(id: number, task: Task) {
        return await prisma.task.update({
            where: {
                id
            },
            data: {
                title: task.title,
                description: task.description,
                status: task.status
            }
        });
    }

    async exists(id: number): Promise<boolean> {
        const count = await prisma.task.count({
            where: {
                id
            }
        });

        return count > 0
    }
}

export default new TaskRepository();