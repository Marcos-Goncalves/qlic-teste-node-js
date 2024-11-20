import { FastifyInstance, FastifyError } from "fastify";
import { AppError } from "./AppError";

export function registerErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error: FastifyError, request, reply) => {
        if (error instanceof AppError) {
            // Retorna erro controlado (AppError)
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            // Retorna erro genérico
            reply.status(500).send({ message: "Erro interno do servidor" });
        }
    });
}
