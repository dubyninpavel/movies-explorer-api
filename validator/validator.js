/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const validateCreateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});

const validateLoginUser = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});

const validateUpdateDataUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
    }),
});

const validateCreateMovie = celebrate({
    body: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().length(4).required(),
        description: Joi.string().required(),
        image: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,./]+)(\.)([-a-z0-9+&@#\%=~_|$?!:,./]+)/).required(),
        trailerLink: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,./]+)(\.)([-a-z0-9+&@#\%=~_|$?!:,./]+)/).required(),
        trumbnail: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,./]+)(\.)([-a-z0-9+&@#\%=~_|$?!:,./]+)/).required(),
        movieId: Joi.string().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
    }),
});

const validateDeleteMovie = celebrate({
    params: Joi.object().keys({
        movieId: Joi.string().length(24).hex(),
    }),
});

module.exports = {
    validateCreateUser,
    validateLoginUser,
    validateUpdateDataUser,
    validateCreateMovie,
    validateDeleteMovie,
};
