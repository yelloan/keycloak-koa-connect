/**
 * Created by zhangsong on 2018/8/9.
 */
import { ParameterizedContext } from 'koa';
import UUID from './../uuid';

function forceLogin(keycloak: any, ctx: ParameterizedContext) {
  const host = ctx.request.hostname;
  const headerHost = ctx.request.host.split(':');
  const port = headerHost[1] || '';
  const protocol = ctx.request.protocol;

  const hasQuery = ~(ctx.request.originalUrl || ctx.request.url).indexOf('?');

  const redirectUrl = `${protocol}://${host}${port === '' ? '' : ':' + port}${ctx.request.originalUrl ||
    ctx.request.url}${hasQuery ? '&' : '?'}auth_callback=1`;

  if (ctx.session) {
    ctx.session.auth_redirect_uri = redirectUrl;
  }

  const uuid = UUID();
  const loginURL = keycloak.loginUrl(uuid, redirectUrl);
  ctx.response.redirect(loginURL);
}

function simpleGuard(role: any, token: any) {
  return token.hasRole(role);
}

export default (keycloak: any, spec: any) => {
  let guard: (arg0: any, arg1: any) => void;

  if (typeof spec === 'function') {
    guard = spec;
  } else if (typeof spec === 'string') {
    guard = simpleGuard.bind(undefined, spec);
  }

  return function protect(ctx: ParameterizedContext, next: () => Promise<void>) {
    if (ctx.state.kauth && ctx.state.kauth.grant) {
      if (!guard || guard(ctx.state.kauth.grant.access_token, ctx)) {
        return next();
      }
      return keycloak.accessDenied(ctx, next);
    }

    if (keycloak.redirectToLogin(ctx)) {
      return forceLogin(keycloak, ctx);
    } else {
      return keycloak.accessDenied(ctx, next);
    }
  };
};
