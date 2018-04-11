const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  //  turns properties into array
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
