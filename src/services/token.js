import redis from '../database/redis';
import encryption from '../helpers/encryption';
import ErrorResponse from '../utils/errorResponse';

const { signRefresh } = encryption;
const ref_duration = process.env.REFRESH_EXPIRE;

const generateRefreshToken = async (datas) => {
  const refreshToken = await signRefresh(datas, ref_duration);
  const { id } = datas.user;
  await redis.get(id, async (err, data) => {
    if (err) {
      return ErrorResponse.internalServerError(
        res,
        `Unable to generate token ${err.message}`
      );
    }

    await redis.set(id, JSON.stringify({ token: refreshToken }));
  });
  return refreshToken;
};

export default generateRefreshToken;
