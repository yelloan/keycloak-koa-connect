"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("./../uuid");
function forceLogin(keycloak, ctx) {
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
    const uuid = uuid_1.default();
    const loginURL = keycloak.loginUrl(uuid, redirectUrl);
    ctx.response.redirect(loginURL);
}
function simpleGuard(role, token) {
    return token.hasRole(role);
}
exports.default = (keycloak, spec) => {
    let guard;
    if (typeof spec === 'function') {
        guard = spec;
    }
    else if (typeof spec === 'string') {
        guard = simpleGuard.bind(undefined, spec);
    }
    return function protect(ctx, next) {
        if (ctx.state.kauth && ctx.state.kauth.grant) {
            if (!guard || guard(ctx.state.kauth.grant.accessToken, ctx)) {
                return next();
            }
            return keycloak.accessDenied(ctx, next);
        }
        if (keycloak.redirectToLogin(ctx)) {
            return forceLogin(keycloak, ctx);
        }
        else {
            return keycloak.accessDenied(ctx, next);
        }
    };
};
//# sourceMappingURL=protect.js.map