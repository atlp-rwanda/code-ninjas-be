class superadminAuth {
  static checkAdmin = async (req, res, next) => {
    try {
      if (req.roleId !== 4) {
        return res.status(403).json({
          msg: 'Access Denied You Do not have permission to access this Page',
        });
      }

      next();
    } catch (error) {
      res.status(400).json({ msg: 'Invalid Token' });
    }
  };
}

export default superadminAuth;
