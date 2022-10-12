/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/config');
const BadRequestError = require('../middlewares/errors/badRequestError');
const ConflictError = require('../middlewares/errors/conflictError');
const NotFoundError = require('../middlewares/errors/notFoundError');
const UnauthorizedError = require('../middlewares/errors/unauthorizedError');

const createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            User.create({
                name, email, password: hashedPassword,
            })
                .then((user) => {
                    res.send({ data: user.hiddenPassword() });
                })
                .catch((err) => {
                    if (err.name === 'ValidationError') {
                        next(new BadRequestError(`${err}. Переданы некорректные данные в методы создания пользователя`));
                    } else if (err.code === 11000) {
                        next(new ConflictError('Пользователь с таким email уже существует'));
                    } else {
                        next(err);
                    }
                });
        })
        .catch((err) => {
            next(err);
        });
};

const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .select('+password')
        .then((user) => {
            bcrypt.compare(password, user.password)
                .then((isUserValid) => {
                    if (isUserValid) {
                        const token = jwt.sign(
                            {
                                _id: user._id,
                            },
                            JWT_SECRET,
                            {
                                expiresIn: '7d',
                            },
                        );
                        res.cookie('jwt', token, {
                            maxAge: 3600000,
                            httpOnly: true,
                            sameSite: true,
                        });
                        res.send({ data: user.hiddenPassword() });
                    } else {
                        next(new UnauthorizedError('Неправльный email или пароль'));
                    }
                });
        })
        .catch(() => {
            next(new NotFoundError('Пользователь с такими данными не найден'));
        });
};

const logOutUser = (req, res) => {
    res.clearCookie('jwt').send({ message: 'Вы вышли из аккаунта' });
};

const getMyUserData = (req, res, next) => {
    const { _id } = req.user;
    User.findOne({ _id })
        .then((user) => {
            if (!user) {
                throw new NotFoundError('Ваш профиль не найден');
            }
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
};

const updateDataUser = (req, res, next) => {
    const { name, email } = req.body;
    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $set: { name, email } },
        {
            returnDocument: 'after',
            runValidators: true,
        },
    )
        .then((user) => {
            if (!user) {
                throw new NotFoundError('Пользователь по указанному id не найден');
            }
            res.send({ data: user });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return next(new BadRequestError('Переданы некорректные данные в методы создания пользователя'));
            }
            next(err);
        });
};

module.exports = {
    createUser,
    loginUser,
    logOutUser,
    getMyUserData,
    updateDataUser,
};
