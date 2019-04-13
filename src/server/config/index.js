import { join } from 'path';
const _ = require('lodash');

let config = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', '/assets')
};

if (process.env.NODE_ENV == 'development') {
  const localConfig = {
    port: 8888,
    cache: false,
    baseUrl: 'http://localhost/yii-php/basic/web/index.php'
  };
  config = _.extend(config, localConfig);
}

if (process.env.NODE_ENV == 'production') {
  const prodConfig = {
    port: 3000,
    cache: 'memory',
    baseUrl: 'http://localhost/yii-php/basic/web/index.php'
  };
  config = _.extend(config, prodConfig);
}

module.exports = config;
