const isDevelopmentEnv = process.env.NODE_ENV && process.env.NODE_ENV === 'development';
const mongoUrl = process.env.MONGO_URL;

module.exports = {
  env: isDevelopmentEnv ? 'development' : 'production',
  // Database connection information
  database: `mongodb://${mongoUrl}`,
}
