import { Router } from 'express';
import CommentController from '../controllers/commentController';
import { verifyAuth } from '../middlewares';

const router = new Router();

router.post('/createComment', verifyAuth, CommentController.addComment);

router.get('/GetAllComments', verifyAuth, CommentController.getAllComments);

router.get('/:id/DeleteComments', verifyAuth, CommentController.deleteComments);

export default router;
