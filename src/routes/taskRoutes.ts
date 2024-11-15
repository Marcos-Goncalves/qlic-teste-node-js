import { FastifyInstance } from "fastify";

async function taskRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks', async (request, reply) => {
        return { tasks: [] };
    });

    fastify.post('/tasks', async (request, reply) => {
        const task = request.body;
        // Adicione lógica para salvar a tarefa
        return { task };
    });

    // Adicione outras rotas conforme necessário
}

export default taskRoutes;