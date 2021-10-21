import { ConnectionOptions } from 'typeorm';
import {
  JwtConfig,
  JwtMiddlewareConfig,
  initialJwtMiddlewareConfig,
} from '@mw-components/jwt';
import { JwtAuthMiddlewareConfig } from './config.types';
/**
 * 这里加入这段是因为 egg 默认的安全策略，在 post 请求的时候如果不传递 token 会返回 403
 * 由于大部分新手用户不太了解这个机制，所以在本地和单测环境做了默认处理
 * 请注意，线上环境依旧会有该错误，需要手动开启
 * 如果想了解更多细节，请访问 https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范
 */
export const security = {
  csrf: false,
};
// 数据库配置
export const orm: ConnectionOptions = {
  type: 'mysql',
  host: '49.235.67.92',
  port: 3306,
  username: 'root',
  password: 'xxx.',
  database: 'midway_server',
  synchronize: false,
  logging: true,
};
// jwt 配置
export const jwtConfig: JwtConfig = {
  secret: '123456', // 默认密钥，生产环境一定要更改!
};
export const jwtMiddlewareConfig: JwtMiddlewareConfig = {
  ...initialJwtMiddlewareConfig,
  enableMiddleware: true,
};
jwtMiddlewareConfig.ignore = jwtMiddlewareConfig.ignore?.concat([
  '/auth/login',
  /\/swagger-u.*/u,
]);
export const jwtAuth: JwtAuthMiddlewareConfig = {
  ignore: jwtMiddlewareConfig.ignore,
  redisScope: 'admin', // redis的作用域前缀
  accessTokenExpiresIn: 60 * 60 * 24 * 3, // 签名过期时间也可写
};