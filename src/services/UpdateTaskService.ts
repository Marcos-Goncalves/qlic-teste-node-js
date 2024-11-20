import TaskRepository from "../repositories/TaskRepository";

interface updateTask {
    title: string;
    description: string;
    status: string;
}

class UpdateTaskService {
    async updateTask(id: number, task: updateTask) {
        return await TaskRepository.update(id, task);
    };
}

export default new UpdateTaskService();