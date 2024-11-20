import fastify from "fastify";
import taskRoutes from "./routes/TaskRoutes";
import { registerErrorHandler } from "./errors/ErrorHandler";

const app = fastify();
const PORT = process.env.PORT || 3333;

app.register(taskRoutes);

// Register error handler
registerErrorHandler(app);

// Start the server
app.listen({
    host: '0.0.0.0',
    port: PORT ? Number(PORT) : 3333
}).then(() => {
    console.log(`Server running on port ${PORT}`);
})