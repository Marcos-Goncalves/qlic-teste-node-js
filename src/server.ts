import fastify from "fastify";
import taskRoutes from "./routes/taskRoutes";

const app = fastify();
const PORT = process.env.PORT || 3333;

app.register(taskRoutes);

// Start the server
app.listen({
    host: '0.0.0.0',
    port: PORT ? Number(PORT) : 3333
}).then(() => {
    console.log(`Server running on port ${PORT}`);
})