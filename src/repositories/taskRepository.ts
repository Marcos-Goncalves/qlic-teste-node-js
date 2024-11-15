import prisma from "../config/database";

interface Task {
    title: string;
    description: string;
}

class TaskRepositories {

    async Create(task: Task) {
        return await prisma.task.create({
            data: {
                title: task.title,
                description: task.description
            }
        });
    }

}

export default new TaskRepositories();