declare const cookieStore: {
    TOKEN_KEY: string;
    get(ctx: any): any;
    wrap(grant: any): void;
};
export default cookieStore;
