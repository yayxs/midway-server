import { JwtMiddlewareConfig } from '@mw-components/jwt';

import { EggAppConfig, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;
export interface JwtAuthMiddlewareConfig {
  /** 签名过期时间也可写 */
  accessTokenExpiresIn: number;
  ignore: JwtMiddlewareConfig['ignore'];
  /** redis的作用域前缀 */
  redisScope: string;
}

declare module 'egg' {
  /**
   * config 配置文件的 TS 声明
   */
  interface EggAppConfig {
    admin: Record<string, string>;
    coreMiddleware: string[];
    jwtAuth: JwtAuthMiddlewareConfig;
  }
}
