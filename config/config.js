const { NODE_ENV = 'development', JWT_SECRET, MONGO_URI } = process.env;
module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  MONGO_URI: NODE_ENV === 'production' ? MONGO_URI : 'mongodb://localhost:27017/moviesdb',
};
