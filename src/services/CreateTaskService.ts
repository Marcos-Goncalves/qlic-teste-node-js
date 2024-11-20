import taskRepository from "../repositories/TaskRepository";

interface CreateTask {
    title: string;
    description: string;
    status: string;
}

class CreateTaskService {
    async createTask(task: CreateTask): Promise<CreateTask> {
        return await taskRepository.create(task);
    };
}

export default new CreateTaskService();