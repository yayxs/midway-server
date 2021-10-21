import { EntityModel } from '@midwayjs/orm';
import {
  // CreateDateColumn,
  // UpdateDateColumn,
  // DeleteDateColumn, // 软删除需要引入
  // AfterLoad,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@EntityModel({
  name: 'admin_users',
})
export class AdminUserModel {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 190,
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
    comment: '密码',
  })
  password: string;
}
