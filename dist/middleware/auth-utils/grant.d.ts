/**
 * Created by zhangsong on 2018/8/9.
 */
import Token from './token';
/**
 * Construct a new grant.
 *
 * The passed in argument may be another `Grant`, or any object with
 * at least `access_token`, and optionally `refresh_token` and `id_token`,
 * `token_type`, and `expires_in`.  Each token should be an instance of
 * `Token` if present.
 *
 * If the passed in object contains a field named `__raw` that is also stashed
 * away as the verbatim raw `String` data of the grant.
 *
 * @param {Object} grant The `Grant` to copy, or a simple `Object` with similar fields.
 *
 * @constructor
 */
declare class Grant {
    accessToken: Token;
    refreshToken: Token;
    idToken: Token;
    tokenType: string;
    expiresIn: any;
    _raw: any;
    constructor(grant: any);
    /**
     * Update this grant in-place given data in another grant.
     *
     * This is used to avoid making client perform extra-bookkeeping
     * to maintain the up-to-date/refreshed grant-set.
     */
    update(grant: any): void;
    /**
     * Returns the raw String of the grant, if available.
     *
     * If the raw string is unavailable (due to programatic construction)
     * then `undefined` is returned.
     */
    toString(): any;
    /**
     * Determine if this grant is expired/out-of-date.
     *
     * Determination is made based upon the expiration status of the `access_token`.
     *
     * An expired grant *may* be possible to refresh, if a valid
     * `refresh_token` is available.
     *
     * @return {boolean} `true` if expired, otherwise `false`.
     */
    isExpired(): boolean;
}
export default Grant;
