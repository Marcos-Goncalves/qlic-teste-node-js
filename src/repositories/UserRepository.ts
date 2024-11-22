import prisma from "../config/database";
import server from "../server";

interface User {
    name: string;
    email: string;
    password: string;
}

class UserRepository {
    async create(user: User) {
        return await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }
}

export default new UserRepository();