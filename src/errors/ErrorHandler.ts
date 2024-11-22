import { FastifyInstance, FastifyError } from "fastify";
import { AppError } from "./AppError";

export function registerErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error: FastifyError, _, reply) => {
        if (error instanceof AppError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send({ message: "Erro interno do servidor" });
        }
    });
}
