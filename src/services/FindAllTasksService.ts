import { array } from "zod";
import TaskRepository from "../repositories/TaskRepository";

export enum StatusEnum {
    PENDENTE = 'pendente',
    EM_ANDAMENTO = 'em andamento',
    CONCLUIDO = 'concluido'
}
export interface Task {
    id: number;
    title: string;
    description: string;
    status: StatusEnum;
}
export interface TaskOptions {
    status?: StatusEnum;
    id?: number;
    page?: number;
    limit?: number;
}

export interface TasksResponse {
    tasks: Task[];
    total: number;
    page: number;
}
class FindAllTasksService {
    async findAll(options?: TaskOptions): Promise<TasksResponse> {
        const tasks = await TaskRepository.findAll(options);
        return { tasks, total: tasks.length, page: options?.page ?? 1};
    };
}

export default new FindAllTasksService();