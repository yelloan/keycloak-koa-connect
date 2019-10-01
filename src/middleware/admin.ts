/**
 * Created by zhangsong on 2018/8/9.
 */

// class Admin {
//   public _keycloak;
//   public _adminRequest;
//   public _url;
//
//   constructor(keycloak, url) {
//     this._keycloak = keycloak;
//     if (url[url.length - 1] !== '/') {
//       url += '/;';
//     }
//     this._url = url + 'k_logout';
//   }
//
//   public getFunction() {
//     return this._adminRequest.bind(this);
//   }
//
// }
import { ParameterizedContext } from 'koa';

function adminLogout(ctx: ParameterizedContext, keycloak: any) {
  let data = '';

  ctx.req.on('data', (d: { toString: () => string }) => {
    data += d.toString();
  });

  ctx.req.on('end', () => {
    const parts = data.split('.');
    const payload = JSON.parse(new Buffer(parts[1], 'base64').toString());
    if (payload.action === 'LOGOUT') {
      const sessionIDs = payload.adapterSessionIds;
      if (!sessionIDs) {
        keycloak.grantManager.notBefore = payload.notBefore;
        return ctx.response.body('ok');
      }
      if (sessionIDs && sessionIDs.length > 0) {
        let seen = 0;
        sessionIDs.forEach((id: any) => {
          keycloak.unstoreGrant(id);
          ++seen;
          if (seen === sessionIDs.length) {
            return ctx.response.body('ok');
          }
        });
      } else {
        return ctx.response.body('ok');
      }
    }
  });
}

function adminNotBefore(ctx: ParameterizedContext, keycloak: any) {
  let data = '';

  ctx.req.on('data', (d: { toString: () => string }) => {
    data += d.toString();
  });

  ctx.req.on('end', () => {
    const parts = data.split('.');
    const payload = JSON.parse(new Buffer(parts[1], 'base64').toString());
    if (payload.action === 'PUSH_NOT_BEFORE') {
      keycloak.grantManager.notBefore = payload.notBefore;
      ctx.response.body('ok');
    }
  });
}

export default function(keycloak: any, adminUrl: any) {
  let url = adminUrl;
  if (url[url.length - 1] !== '/') {
    url = url + '/';
  }
  const urlLogout = url + 'k_logout';
  const urlNotBefore = url + 'k_push_not_before';

  return async function adminRequest(ctx: ParameterizedContext, next: () => void) {
    switch (ctx.req.url) {
      case urlLogout:
        adminLogout(ctx, keycloak);
        break;
      case urlNotBefore:
        adminNotBefore(ctx, keycloak);
        break;
      default:
        return await next();
    }
  };
}
