import { FastifyRequest, FastifyReply } from "fastify";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
        return { request };
    } catch (err) {
        return reply.status(401).send({ error: "Sem autorização" });
    }
};