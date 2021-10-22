import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Context } from 'src/interface';
import { Repository } from 'typeorm';

import { AdminUserModel } from '../../model/admin-user';

@Provide()
export class AdminUserService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(AdminUserModel)
  adminUserModel: Repository<AdminUserModel>;
  async getAdminUserById(id: string) {
    const row = this.adminUserModel
      .createQueryBuilder()
      .select()
      .where({ id: id })
      .getOne();

    return row;
  }
}
