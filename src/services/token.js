import redis from '../database/config/redis.config';
import encryption from '../helpers/encryption';

const { signRefresh } = encryption;
const ref_duration = process.env.REFRESH_EXPIRE;

const generateRefreshToken = async (datas) => {
  const refreshToken = await signRefresh(datas, ref_duration);
  const { id } = datas;
  await redis.get(id, async (err, data) => {
    if (err) {
      return ErrorResponse(res, 500, `Unable to generate token ${err.message}`);
    }

    await redis.set(id, JSON.stringify({ token: refreshToken }));
  });
  return refreshToken;
};

export default generateRefreshToken;
