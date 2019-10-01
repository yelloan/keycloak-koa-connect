/**
 * Created by zhangsong on 2018/8/9.
 */

import { Context } from 'koa';
import * as URL from 'url';

export default (keycloak: any) => {
  return function postAuth(ctx: Context, next: () => Promise<void>) {
    if (!ctx.request.query.auth_callback) {
      return next();
    }

    if (ctx.request.query.error) {
      return keycloak.accessDenied(ctx, next);
    }

    keycloak
      .getGrantFromCode(ctx.request.query.code, ctx)
      .then((grant: any) => {
        const urlParts = {
          pathname: ctx.request.path,
          query: ctx.request.query,
        };

        delete urlParts.query.code;
        delete urlParts.query.auth_callback;
        delete urlParts.query.state;
        delete urlParts.query.session_state;

        const cleanUrl = URL.format(urlParts);

        ctx.state.kauth.grant = grant;
        try {
          keycloak.authenticated(ctx);
        } catch (err) {
          console.error(err);
        }
        ctx.response.redirect(cleanUrl);
      })
      .catch((err: Error) => {
        keycloak.accessDenied(ctx);
        console.error('Could not obtain grant code: ' + err);
      });
  };
};
