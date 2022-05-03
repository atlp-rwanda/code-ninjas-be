export const checkSuperAdmin = async (req, res, next) => {
  if (req.roleId !== 4) {
    return res.status(403).json({
      error: 'Unauthorized access',
    });
  }

  next();
};

export const checkAdmin = async (req, res, next) => {
  if (req.roleId !== 4 && req.roleId !== 3) {
    return res.status(403).json({
      error: 'Unauthorized access',
    });
  }
  next();
};
