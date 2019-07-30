const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;


 try {
      if (authorization) {
        const token = authorization.replace('Bearer', '').trim();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = await UserModel.findById(decoded.id);

        if (userFound.token === token) {

          req.uid = decoded.id;
          return next();
        }
      }

 } catch {

 }
  res.status(401).json({ message: 'Authorization required' });
};
