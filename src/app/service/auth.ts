import { Config, Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { JwtComponent } from '@mw-components/jwt';
import { Repository } from 'typeorm';
import { JwtAuthMiddlewareConfig } from '../../config/config.types';
import { Context } from '../../interface';
import { AdminUserModel } from '../model/admin-user';

@Provide()
export class AuthService {
  @Inject()
  private ctx: Context;

  @Inject('jwt:jwtComponent')
  jwt: JwtComponent;

  @Config('jwtAuth')
  private jwtAuthConfig: JwtAuthMiddlewareConfig;

  @InjectEntityModel(AdminUserModel)
  private adminUserModel: Repository<AdminUserModel>;
  async localHandler(params: {
    username: string;
    password: string;
  }): Promise<AdminUserModel | null> {
    console.log('ctx', this.ctx);
    // 获取管理员
    const getAdminUser = (username: string) => {
      return this.getAdminUserByUserName(username);
    };

    // 查询管理是否在数据库中
    const existAdmiUser = await getAdminUser(params.username);
    if (!existAdmiUser) {
      return null;
    }
    // 匹配密码
    const passhash = existAdmiUser.password;
    console.log('passhash', passhash);
    return existAdmiUser;
  }

  /**
   *
   */
  async getAdminUserByUserName(username: string): Promise<AdminUserModel> {
    const user = await this.adminUserModel.findOne({
      where: {
        username,
      },
    });
    return user;
  }
  async createAdminUserToken(data: AdminUserModel): Promise<string> {
    try {
      const token: string = this.jwt.sign({ id: data.id }, '', {
        expiresIn: this.jwtAuthConfig.accessTokenExpiresIn,
      });
      // 存redis
      // 返回token
      return token;
    } catch (e) {
      console.log(123);
    }
  }
}
