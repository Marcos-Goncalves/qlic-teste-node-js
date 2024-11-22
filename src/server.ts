import 'dotenv/config';
import fastify, { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import taskRoutes from "./routes/TaskRoutes";
import userRoutes from "./routes/UserRoutes";
import fastifyJwt from "@fastify/jwt";
import { registerErrorHandler } from "./errors/ErrorHandler";

const app  = fastify();
const PORT = process.env.PORT;

// Plugin para JWT
app.register(fastifyJwt, {
    secret: "supersecret",
});

// Register routes
app.register(taskRoutes);
app.register(userRoutes);

// Register error handler
registerErrorHandler(app);

export default app;

// Start the server
app.listen({
    host: '0.0.0.0',
    port: Number(PORT)
}).then(() => {
    console.log(`Server running on port ${PORT}`);
})