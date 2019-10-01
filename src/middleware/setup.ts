import { ParameterizedContext } from 'koa';

/**
 * Created by zhangsong on 2018/8/9.
 */
export default async function setup(ctx: ParameterizedContext<{ kauth: {} }>, next: () => Promise<void>) {
  ctx.state.kauth = {};
  await next();
}
