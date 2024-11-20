import TaskRepository from "../repositories/TaskRepository";

interface UpdateTask {
    title: string;
    description: string;
    status: string;
}

class UpdateTaskService {
    async validateTask(id: number): Promise<boolean> {
        const taskExists = await TaskRepository.exists(id);
        return taskExists;
    }

    async updateTask(id: number, task: UpdateTask): Promise<UpdateTask> {
        return await TaskRepository.update(id, task);
    };
}

export default new UpdateTaskService();