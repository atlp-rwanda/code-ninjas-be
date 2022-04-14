import profileImage from '../services/imageUpload';
import UserService from '../services/user.service';
import successResponse from '../utils/successResponse';
import ErrorResponse from '../utils/errorResponse';
import { verifyToken } from '../helpers/token';

const { findUser, updateUser } = UserService;

class Profile {
  static async getProfile(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
        age,
        gender,
        dob,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        address,
        lineManager,
        phoneNumber,
        maritalStatus,
        isComplete,
      } = req.user;

      return successResponse(res, 200, `Successfully retrieved profile`, {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
        age,
        gender,
        dob,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        address,
        lineManager,
        phoneNumber,
        maritalStatus,
        isComplete,
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return ErrorResponse.notFoundError(
          res,
          404,
          `Ooops! No such User was found`
        );
      }
      return next(
        new ErrorResponse.internalServerError(
          res,
          500,
          `Error occured while fetching your profile ${error.message}`
        )
      );
    }
  }

  static async completeProfile(req, res, next) {
    try {
      const updated = await updateUser(req.user, {
        ...req.body,
        profileImage: '',
        isComplete: true,
      });
      if (req.files) {
        const photo = await profileImage(req);
        updated.profileImage = photo;
        updated.save();
      }
      const updatedUser = req.user;
      const {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
        age,
        gender,
        dob,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        address,
        lineManager,
        phoneNumber,
        maritalStatus,
        isComplete,
      } = updatedUser;
      return successResponse(res, 201, 'User profile completed successfully', {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
        age,
        gender,
        dob,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        address,
        lineManager,
        phoneNumber,
        maritalStatus,
        isComplete,
      });
    } catch (error) {
      return next(
        new ErrorResponse(
          res,
          500,
          'Error occured while completing your profile'
        )
      );
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const updated = await updateUser(req.user, {
        ...req.body,
        profileImage: '',
      });

      if (req.files) {
        const photo = await profileImage(req);
        updated.profileImage = photo;
        updated.save();
      }
      const {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
        age,
        gender,
        dob,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        address,
        lineManager,
        phoneNumber,
        maritalStatus,
        isComplete,
      } = req.user;
      return successResponse(res, 200, 'User profile updated successfully', {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
        age,
        gender,
        dob,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        address,
        lineManager,
        phoneNumber,
        maritalStatus,
        isComplete,
      });
    } catch (error) {
      return next(
        new ErrorResponse(res, 500, 'Error occured while updating your profile')
      );
    }
  }
}

export default Profile;
