const routes = require('express').Router();
const userRoutes = require('./users');
const { createUser, loginUser, logOutUser } = require('../controllers/user');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLoginUser } = require('../validator/validator');

routes.post('/signin', validateLoginUser, loginUser);
routes.post('/signup', validateCreateUser, createUser);

routes.use(auth);

routes.get('/signout', logOutUser);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

module.exports = routes;
