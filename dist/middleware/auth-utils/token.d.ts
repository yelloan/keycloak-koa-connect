/**
 * Created by zhangsong on 2018/8/9.
 */
/// <reference types="node" />
/**
 * Construct a token.
 *
 * Based on a JSON Web Token string, construct a token object. Optionally
 * if a `clientId` is provided, the token may be tested for roles with
 * `hasRole()`.
 *
 * @constructor
 *
 * @param {String} token The JSON Web Token formatted token string.
 * @param {String} clientId Optional clientId if this is an `access_token`.
 */
declare class Token {
    token: any;
    clientId: string;
    header: any;
    content: {
        exp: any;
        resource_access?: any;
        realm_access?: any;
    };
    signature: Buffer;
    signed: string;
    constructor(token: string, clientId?: string);
    /**
     * Determine if this token is expired.
     * @return {boolean} `true` if it is expired, otherwise `false`.
     */
    isExpired(): boolean;
    hasRole(name: string): boolean;
    hasApplicationRole(appName: string | number, roleName: any): boolean;
    hasRealmRole(roleName: any): boolean;
}
export default Token;
