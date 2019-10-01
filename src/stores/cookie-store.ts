/**
 * Created by zhangsong on 2018/8/9.
 */
const store = (grant: any) => {
  return (ctx: any) => {
    ctx.session[cookieStore.TOKEN_KEY] = grant.__raw;
  };
};

const unStore = (ctx: any) => {
  ctx.cookies.set(cookieStore.TOKEN_KEY, '', {
    overwrite: true,
  });
};

const cookieStore = {
  TOKEN_KEY: 'keycloak-token',
  get(ctx: any) {
    const value = ctx.cookies.get(cookieStore.TOKEN_KEY);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        // ignore
      }
    }
  },
  wrap(grant: any) {
    grant.store = store(grant);
    grant.unstore = unStore;
  },
};

export default cookieStore;
