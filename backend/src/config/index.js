const isDevelopmentEnv = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

module.exports = {
  env: isDevelopmentEnv ? 'development' : 'production',
  // Database connection information
  database: `mongodb://mongo:27017/presentation`,
}