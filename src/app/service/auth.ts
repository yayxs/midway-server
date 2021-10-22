import { Plugin, Inject, Provide } from '@midwayjs/decorator';
// import * as Jwt from 'egg-jwt';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Context } from '../../interface';
import { AdminUserModel } from '../model/admin-user';
import * as assert from 'assert';
@Provide()
export class AuthService {
  constructor() {}

  @Inject()
  private ctx: Context;
  @Plugin()
  jwt;
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
  /**
   * 生成token 保存redis中
   * @param data
   * @returns {String} token字符串
   */
  async createAdminUserToken(data: AdminUserModel): Promise<string> {
    console.log('当前的用户', data);
    const payload = { iat: data.id };
    const token: string = await this.jwt.sign(payload);
    const valid = this.jwt.verify(token);
    assert.deepStrictEqual(valid, payload);

    return token;
    // ctx.body = `\nToken: ${token}`;
  }
}
