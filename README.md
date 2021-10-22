## dev

```bash
cross-env ets && cross-env NODE_ENV=local midway-bin dev --ts --debug # ● 使用 --ts 指定 TypeScript（ts-node）环境启动
```
## currentFramework

```typescript
const currentFramework = [
  '@midwayjs/web',
  '@midwayjs/koa',
  '@midwayjs/express',
  '@midwayjs/serverless-app',
  '@midwayjs/grpc',
  '@midwayjs/rabbitmq',
  '@midwayjs/socketio',
  '@midwayjs/faas',
];
```
## build

```bash
NODE_ENV=production pm2 start ./bootstrap.js --name midway_app -i 4
```
