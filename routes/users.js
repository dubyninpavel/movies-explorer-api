const userRoutes = require('express').Router();

const { getMyUserData, updateDataUser } = require('../controllers/user');
const { validateUpdateDataUser } = require('../validator/validator');

userRoutes.get('/me', getMyUserData);
userRoutes.patch('/me', validateUpdateDataUser, updateDataUser);

module.exports = userRoutes;
