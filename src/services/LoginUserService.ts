import { AppError } from "../errors/AppError";
import UserRepository from "../repositories/UserRepository";
import bcrypt from 'bcrypt';
import server from "../server";

interface LoginUser {
    email: string;
    password: string;
}

class LoginUserService {
    async execute(user: LoginUser): Promise<String> {
        const userExists = await UserRepository.findByEmail(user.email);
        if (!userExists) {
            throw new AppError('Usuário não encontrado!', 404);
        }

        const passwordMatch = await bcrypt.compare(user.password, userExists.password);

        if(!passwordMatch) {
            throw new AppError('Email ou senha incorretos!', 401);
        }


        const token = server.jwt.sign(userExists, {
            expiresIn: '1d'
        });
        
        return token;
    }
}

export default new LoginUserService();