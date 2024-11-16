import CreateTaskService from "../services/CreateTaskService";

class TaskController {

    async createTask({ title, description, status }: { title: string; description: string; status: string }) {
        try {
            const newTask = await CreateTaskService.createTask({ title, description, status });
            return newTask;
        } catch (error) {
            const errorMessage = (error as Error).message;
            throw new Error(errorMessage);
        }
    }

}


export default new TaskController();