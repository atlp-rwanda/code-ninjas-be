class superadminAuth {
  static checkAdmin = async (req, res, next) => {
    if (req.roleId !== 4) {
      return res.status(403).json({
        msg: 'Unauthorized access',
      });
    }

    next();
  };
}

export default superadminAuth;
