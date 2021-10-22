import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

export class infoDTO {
  @CreateApiPropertyDoc('管理员的id')
  @Rule(RuleType.string().trim().max(10).required())
  id: string;
}
