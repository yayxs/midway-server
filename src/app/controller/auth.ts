import {
  Controller,
  Provide,
  Inject,
  Post,
  Validate,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from '../../interface';
import { AuthService } from '../service/auth';
import { LoginDTO } from '../dto/auth';
@Provide()
@Controller('/api/auth', {
  tagName: '管理员登录授权',
  description: '包含管理员授权登录、获取信息等接口 ',
})
export class AuthController {
  @Inject('authService')
  service: AuthService;

  @(CreateApiDoc()
    .summary('管理员登录')
    .description(
      '使用帐号密码登录，拿到 token 后，前端需要将 token 放入 header 中，格式 token: Bearer ${token}'
    )
    .respond(200, 'success', 'json', {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9xxxx',
        currentAuthority: 'admin',
        status: 'ok',
        type: 'account',
      },
    })
    .build())
  @Post('/login')
  @Validate()
  async login(ctx: Context, @Body(ALL) params: LoginDTO): Promise<void> {
    // 用户
    const adminUser = await this.service.localHandler(params);
    console.log('adminUser', adminUser);

    // 生成token
    const token = await this.service.createAdminUserToken(adminUser);

    console.log('token', token);
    ctx.helper.success({
      token,
      currentAuthority: 'admin',
      status: 'ok',
      type: 'account',
    });
  }
}
