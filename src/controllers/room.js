import { Room } from '../database/models';
import roomService from '../services/room.service';
import ErrorResponse from '../utils/errorResponse';

class RoomController {
  static createRoom = async (req, res) => {
    try {
      const roomExist = await Room.findOne({
        where: {
          number: req.body.number,
          accommodationId: req.body.accommodationId,
        },
      });
      if (roomExist) {
        return res
          .status(409)
          .json({ error: 'Room already in this accommodation' });
      }
      const room = await roomService.createRoom(req.body);
      return res.status(201).json({
        status: 201,
        message: 'Room added successfully',
        payload: room,
      });
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static getAllRoomsOfAccommodation = async (req, res) => {
    try {
      const foundRooms = await roomService.getAllRoomsOfAccommodation(
        req.params.accommodationId
      );
      return res.status(200).json({
        status: '200',
        message: 'All rooms in given accommodation',
        payload: foundRooms,
      });
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static getSingleRoom = async (req, res) => {
    try {
      const foundRoom = await roomService.getSingleRoom(req.params.roomId);
      if (foundRoom) {
        return res.status(200).json({
          status: '200',
          message: 'Room found',
          payload: foundRoom,
        });
      }
      return res.status(404).json({
        status: '404',
        message: 'Room not found',
      });
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static updateRoom = async (req, res) => {
    try {
      const room = await roomService.getSingleRoom(req.params.roomId);

      await room.update(req.body);

      return res.status(200).json({
        status: '200',
        message: 'Room updated successfully',
      });
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static deleteRoom = async (req, res) => {
    try {
      const room = await roomService.getSingleRoom(req.params.roomId);

      if (!room) {
        return res.status(404).json({
          status: '404',
          message: 'Room not found',
        });
      }
      await roomService.deleteRoom(req.params.roomId);

      return res.status(200).json({
        status: '200',
        message: 'Room deleted successfully',
      });
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };
}

export default RoomController;
