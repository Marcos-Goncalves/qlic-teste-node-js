import TaskRepository from "../repositories/TaskRepository";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}
class FindAllTasksService {
    async findAll(status?: string): Promise<Task[]> {
        if (status) {
            return await TaskRepository.findByStatus(status);
        } else {
            return await TaskRepository.findAll();
        }
    };
}

export default new FindAllTasksService();