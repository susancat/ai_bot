import { Router } from 'express';
import userRoutes from './userRoutes';
import chatRoutes from './chatRoutes';
const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chats", chatRoutes); //domain/api/v1/chats

export default appRouter;