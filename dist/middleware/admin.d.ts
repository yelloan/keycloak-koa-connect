/**
 * Created by zhangsong on 2018/8/9.
 */
import { Context } from 'koa';
export default function (keycloak: any, adminUrl: any): (ctx: Context, next: () => void) => Promise<void>;
