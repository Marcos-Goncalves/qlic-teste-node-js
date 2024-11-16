import { FastifyInstance } from "fastify";
import TaskController from "../controllers/TaskController";
import { z } from "zod";

async function taskRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks', async (request, reply) => {
        return { tasks: [] };
    });

    fastify.post('/tasks', async (request, reply) => {
        const createTaskSchema = z.object({
            title: z.string(),
            description: z.string(),
            status: z.string().transform(value => value.trim() === '' ? 'pendente' : value).default('pendente')
        })

        try {
            const { title, description, status } = createTaskSchema.parse(request.body);
            
            await TaskController.createTask( {title, description, status} );
            return reply.code(201).send({
                message: 'Tarefa criada com sucesso!'
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.code(400).send({
                    message: error.errors[0].message
                });
            }

            return reply.code(500).send({
                message: 'Erro interno no servidor'
            });
        }
    });

    // Adicione outras rotas conforme necessário
}

export default taskRoutes;