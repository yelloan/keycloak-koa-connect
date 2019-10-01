/**
 * Created by zhangsong on 2018/8/9.
 */
declare class SessionStore {
    static TOKEN_KEY: string;
    store: any;
    constructor(st: any);
    get(ctx: any): any;
    clear(sessionId: any): void;
    wrap(grant: any): void;
}
export default SessionStore;
