// 声明开启插件
import { EggPlugin } from 'egg';
export default {
  logrotator: false, // disable when use @midwayjs/logger
  static: false, // default is true
  jwt: {
    enable: true,
    package: '@waiting/egg-jwt',
  },
} as EggPlugin;
