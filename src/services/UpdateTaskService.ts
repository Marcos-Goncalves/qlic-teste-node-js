import TaskRepository from "../repositories/TaskRepository";
import { AppError } from "../errors/AppError";

interface UpdateTask {
    title: string;
    description: string;
    status: string;
}

class UpdateTaskService {
    async updateTask(id: number, task: UpdateTask): Promise<UpdateTask> {
        //Verifica se a tarefa existe
        const taskExists = await TaskRepository.exists(id);

        if (!taskExists) {
            throw new AppError('Tarefa não encontrada!', 404);
        }

        //Atualiza a tarefa
        return await TaskRepository.update(id, task);
    };
}

export default new UpdateTaskService();