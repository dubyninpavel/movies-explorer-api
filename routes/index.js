const routes = require('express').Router();
const userRoutes = require('./users');
const { createUser, loginUser, logOutUser } = require('../controllers/user');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLoginUser } = require('../validator/validator');
const NotFoundError = require('../middlewares/errors/notFoundError');
const { URL_NOT_FOUND } = require('../constants/constants');

routes.post('/signin', validateLoginUser, loginUser);
routes.post('/signup', validateCreateUser, createUser);

routes.use(auth);

routes.get('/signout', logOutUser);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.all('*', (req, res, next) => {
  next(new NotFoundError(URL_NOT_FOUND));
});

module.exports = routes;
