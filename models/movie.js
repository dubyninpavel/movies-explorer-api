const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const User = require('./user');

const movieSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (v) => isUrl(v),
            message: 'Введен некорректный url',
        },
    },
    trailerLink: {
        type: String,
        required: true,
        validate: {
            validator: (v) => isUrl(v),
            message: 'Введен некорректный url',
        },
    },
    trumbnail: {
        type: String,
        required: true,
        validate: {
            validator: (v) => isUrl(v),
            message: 'Введен некорректный url',
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    nameRU: {
        type: String,
        required: true,
    },
    nameEN: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('movie', movieSchema);
