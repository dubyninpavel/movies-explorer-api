const { NODE_ENV = 'development', JWT_SECRET } = process.env;
module.exports = {
    JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
