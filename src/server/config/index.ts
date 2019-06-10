import { extend } from "lodash";
import { join } from "path";
let config = {
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"),
  port: 8081
};
const mergeconfig = () => {
  //开发环境下
  if (process.env.NODE_ENV == "development") {
    const localConfig = {
      port: 8081
    };
    config = extend(config, localConfig);
  }
  //上线环境下
  if (process.env.NODE_ENV == "production") {
    const proConfig = {
      port: 80
    };
    config = extend(config, proConfig);
  }
  return config;
};
export default mergeconfig();
