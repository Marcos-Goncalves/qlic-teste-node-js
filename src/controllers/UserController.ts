import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AppError } from "../errors/AppError";
import CreateUserService from "../services/CreateUserService";
import LoginUserService from "../services/LoginUserService";

class UserController {
    async create(request: FastifyRequest['body'], reply: FastifyReply) {
        const createUserSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string()
        });

        try {
            const { name, email, password } = createUserSchema.parse(request);

            await CreateUserService.execute({ name, email, password });
            return reply.code(201).send({
                message: 'Usuário criado com sucesso!'
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new AppError(error.errors[0].message, 400);
            }

            throw error;
        }
    }

    async login(request: FastifyRequest['body'], reply: FastifyReply) {
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string()
        });

        try {
            const { email, password } = loginSchema.parse(request);

            const token = await LoginUserService.execute({ email, password });
            
            return reply.code(200).send({
                message: 'Usuário logado com sucesso!',
                token: token
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new AppError(error.errors[0].message, 400);
            }

            throw error;
        }
    }
}

export default new UserController();