import { ChatMessage, User } from '../database/models';
import ErrorResponse from '../utils/errorResponse';

class chatController {
  static createChatMessage = async (req, res) => {
    try {
      const addMessage = await ChatMessage.create({
        userId: req.user.id,
        room: 'Barefoot Nomad',
        message: req.body.message,
      });
      return res.status(201).json({
        status: '201',
        message: 'Message added successfully',
        payload: addMessage,
      });
    } catch (err) {
      ErrorResponse.internalServerError(res, err.message);
    }
  };

  static getAllChatMessages = async (req, res) => {
    try {
      const messages = await ChatMessage.findAll({
        where: { room: 'Barefoot Nomad' },
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName', 'email'],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId', 'room'],
        },
      });
      return res.status(200).json({
        status: '200',
        message: 'These are all the available messages',
        payload: messages,
      });
    } catch (error) {
      console.log(error);
      ErrorResponse.internalServerError(res, error.message);
    }
  };
}

export default chatController;
