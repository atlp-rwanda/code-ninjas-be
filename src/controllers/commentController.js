import Comment from '../database/models/comment';
import ErrorResponse from '../utils/errorResponse';
import SuccessResponse from '../utils/successResponse';

class commentController {
  static addComment = async (req, res) => {
    try {
      // create and store the new comment
      const createComment = await Comment.create({
        message: req.body.message,
      });
      SuccessResponse(res, 200, createComment);
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static getAllComments = async (req, res) => {
    try {
      const comment = await Comment.find();
      SuccessResponse(res, 200, comment);
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static deleteComments = async (req, res) => {
    try {
      const findComment = await Comment.findOne({
        where: { id: req.params.id },
      });
      if (!findComment) {
        return ErrorResponse.notFoundError(res, 'Comment not found');
      }

      const deleteComment = await Comment.deleteOne({
        where: { id: req.params.id },
      });
      SuccessResponse(res, 200, deleteComment);
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };
}

export default commentController;
