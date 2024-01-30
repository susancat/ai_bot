import { Router } from 'express';
import { verifyToken } from '../utils/tokenManager';
import { validate, chatCompletionValidator } from '../utils/validators';
import { generateChatCompletion } from '../controllers/chatControllers';

const chatRoutes = Router();
chatRoutes.post(
    '/new', 
    validate(chatCompletionValidator), 
    verifyToken,
    generateChatCompletion
); //only create a new chat for the authenticated user

export default chatRoutes;