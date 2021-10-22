import {
  ALL,
  Controller,
  Get,
  Inject,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { infoDTO } from 'src/app/dto/admin/user';
import { Context } from 'src/interface';

import { AdminUserService } from '../../service/admin/user';
@Provide()
@Controller('/api/admin/user', {
  tagName: '管理员管理',
  description: '包含管理员的增、删、改、查',
})
export class AdminUserController {
  @Inject('adminUserService')
  service: AdminUserService;
  @Get('/info', {
    summary: '获取单个管理员详情',
    description: '获取管理员信息',
  })
  async info(ctx: Context, @Query(ALL) query: infoDTO) {
    const res = await this.service.getAdminUserById(query.id);

    ctx.helper.success(res);
  }
}
