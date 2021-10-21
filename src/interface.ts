import {
  IMidwayWebApplication as Application,
  IMidwayWebContext as Context,
  IMidwayWebNext,
} from '@midwayjs/web';
export { Application, Context, IMidwayWebNext };
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}
