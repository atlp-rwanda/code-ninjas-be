import UserService from '../services/user.service';
import successResponse from '../utils/successResponse';
import ErrorResponse from '../utils/errorResponse';
import cloudinary from '../config/cloudinary';

const { updateUser } = UserService;

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
        imageUrl,
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
        imageUrl,
        isComplete,
      });
    } catch (error) {
      return ErrorResponse.internalServerError(
        res,
        `Error occured while fetching your profile ${error.message}`
      );
    }
  }

  static async completeProfile(req, res, next) {
    try {
      if (req.file) {
        const photo = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Barefoot Nomad',
        });
        req.user.imageUrl = photo.url;
        req.user.imageId = photo.public_id;
        req.user.save();
      }
      const updated = await updateUser(req.user, {
        ...req.body,
        isComplete: true,
      });
      const {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
        gender,
        dob,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        address,
        lineManager,
        phoneNumber,
        imageUrl,
        maritalStatus,
        isComplete,
      } = updated;
      return successResponse(res, 200, 'User profile completed successfully', {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
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
        imageUrl,
        isComplete,
      });
    } catch (error) {
      return ErrorResponse.internalServerError(
        res,
        `Error occured while completing your profile ${error.message}`
      );
    }
  }

  static async updateProfile(req, res, next) {
    try {
      if (req.file) {
        cloudinary.uploader.destroy(req.user.imageId);
        const photo = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Barefoot Nomad',
        });
        req.user.imageUrl = photo.url;
        req.user.imageId = photo.public_id;
        req.user.save();
      }
      const updated = await updateUser(req.user, {
        ...req.body,
      });
      const {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
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
        imageUrl,
        isComplete,
      } = updated;
      return successResponse(res, 200, 'User profile updated successfully', {
        firstName,
        lastName,
        email,
        userName,
        isVerified,
        facebookId,
        googleId,
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
        imageUrl,
        isComplete,
      });
    } catch (error) {
      return ErrorResponse.internalServerError(
        res,
        `Error occured while updating your profile ${error.message}`
      );
    }
  }
}

export default Profile;
