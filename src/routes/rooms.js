import express from 'express';
import RoomController from '../controllers/room';
import { verifyAuth, checkAdmin } from '../middlewares';

const router = express.Router();

router.post('/', verifyAuth, checkAdmin, RoomController.createRoom);
router.get('/:roomId', RoomController.getSingleRoom);
router.patch('/:roomId', verifyAuth, checkAdmin, RoomController.updateRoom);
router.delete('/:roomId', verifyAuth, checkAdmin, RoomController.deleteRoom);

export default router;
