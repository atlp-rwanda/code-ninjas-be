export const checkSuperAdmin = async (req, res, next) => {
  if (req.roleId !== 4) {
    return res.status(403).json({
      error: 'Unauthorized access',
    });
  }

  next();
};

export const checkManager = async (req, res, next) => {
  if (req.roleId !== 2) {
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

export const checkRequester = async (req, res, next) => {
  if (req.user.roleId !== 1) {
    return res.status(403).json({
      error: 'Unauthorized access',
    });
  }
  next();
};
