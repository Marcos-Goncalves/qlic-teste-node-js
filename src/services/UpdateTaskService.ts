import TaskRepository from "../repositories/TaskRepository";

interface updateTask {
    title: string;
    description: string;
    status: string;
}

class UpdateTaskService {

    async updateTask(id: number, task: updateTask) {
        const taskExists = await TaskRepository.exists(id);
        if (!taskExists) {
            return taskExists;
        }

        return await TaskRepository.update(id, task);
    };
}

export default new UpdateTaskService();