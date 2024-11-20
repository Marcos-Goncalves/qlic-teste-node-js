import TaskRepository from "../repositories/TaskRepository";

class FindAllTasksService {
    async findAll(status?: string) {
        if (status) {
            return await TaskRepository.findByStatus(status);
        } else {
            return await TaskRepository.findAll();
        }
    };
}

export default new FindAllTasksService();