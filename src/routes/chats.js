import { Router } from 'express';
import ChatController from '../controllers/chatController';
import ChatValidation from '../validations/chatValidation';
import { verifyAuth, logger } from '../middlewares';

const router = new Router();

router.post(
  '/',
  verifyAuth,
  logger,
  ChatValidation.validateChats,
  ChatController.createChatMessage
);

router.get('/', verifyAuth, logger, ChatController.getAllChatMessages);

export default router;
