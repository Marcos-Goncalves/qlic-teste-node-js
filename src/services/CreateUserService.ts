import UserRepository from "../repositories/UserRepository";
import { AppError } from "../errors/AppError";
import bcrypt from 'bcrypt';

interface CreateUser {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute(user: CreateUser): Promise<CreateUser> {
        const userExists = await UserRepository.findByEmail(user.email);
        if (userExists) {
            throw new AppError('Usuário já cadastrado!', 409);
        }

        const passwordHash = await bcrypt.hash(user.password, 10);
        user.password = passwordHash;

        return await UserRepository.create(user);
    }
}

export default new CreateUserService();