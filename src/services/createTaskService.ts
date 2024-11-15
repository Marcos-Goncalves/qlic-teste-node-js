import taskRepositories from "../repositories/taskRepository";

interface CreateTask {
    title: string;
    description: string;
}

class CreateTaskService {
    async CreateTask(task: CreateTask) {
        return await taskRepositories.Create(task);
    };
}

export default new CreateTaskService();