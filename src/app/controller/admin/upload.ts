import { basename } from 'path';
// const fs = require('mz/fs');
import { Controller, Inject, Post, Provide } from '@midwayjs/decorator';
import { Context } from 'src/interface';

@Provide()
@Controller('/admin/upload', { tagName: '文件上传', description: '文件上传' })
export class UploadController {
  @Inject()
  ctx: Context;

  @Post('/oss')
  async uploadFile() {
    const file = this.ctx.request.files[0];
    const name = 'vast-upload/' + basename(file.filename);
    let res;
    try {
      res = await this.ctx.oss.put(name, file.filepath);
    } finally {
      // 需要删除临时文件
      // await fs.unlink(file.filepath);
    }
    return {
      url: res.url,
      // 获取所有的字段值
      requestBody: this.ctx.request.body,
    };
  }
}
