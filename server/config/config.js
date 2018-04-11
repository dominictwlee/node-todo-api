const env = process.env.NODE_ENV || 'development';
const config = require('./config.json');

if (env === 'development' || env === 'test') {
  const envConfig = config[env];

  //  Put keys into an array and loop through them
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
