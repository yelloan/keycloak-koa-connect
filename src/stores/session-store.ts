/**
 * Created by zhangsong on 2018/8/9.
 */

const store = (grant: any) => {
  return (ctx: any): any => {
    ctx.request.session[SessionStore.TOKEN_KEY] = grant.__raw;
  };
};
const unStore = (ctx: any): any => {
  delete ctx.request.session[SessionStore.TOKEN_KEY];
};

class SessionStore {
  public static TOKEN_KEY = 'keycloak-token';

  public store: any;
  constructor(st: any) {
    this.store = st;
  }

  public get(ctx: any) {
    return ctx.request.session[SessionStore.TOKEN_KEY];
  }

  public clear(sessionId: any) {
    const self = this;
    this.store.get(sessionId, (err: Error, session: any) => {
      if (err) {
        console.error(err);
      }
      if (session) {
        delete session[SessionStore.TOKEN_KEY];
        self.store.set(sessionId, session);
      }
    });
  }

  public wrap(grant: any) {
    if (grant) {
      grant.store = store(grant);
      grant.unstore = unStore;
    }
  }
}

export default SessionStore;
