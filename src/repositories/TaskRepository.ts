import prisma from "../config/database";

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

    async findAll() {
        return await prisma.task.findMany();
    }

    async findByStatus(status: string) {
        return await prisma.task.findMany({
            where: {
                status
            }
        });
    }
}

export default new TaskRepository();