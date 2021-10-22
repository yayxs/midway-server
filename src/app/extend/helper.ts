export = {
  success(this: any, result = null, message = '请求成功', status = 200) {
    this.ctx.body = {
      code: status,
      message,
      data: result,
    };
    this.ctx.status = status;
  },
};
