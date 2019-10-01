import Config from './config';
import Grant from './grant';
import Rotation from './rotation';
import Token from './token';
/**
 * Construct a grant manager.
 *
 * @param {Config} config Config object.
 *
 * @constructor
 */
declare class GrantManager {
    realmUrl: string;
    clientId: string;
    secret: any;
    publicKey: string | object;
    public: any;
    bearerOnly: any;
    notBefore: number;
    rotation: Rotation;
    constructor(config: Config);
    /**
     * Use the direct grant API to obtain a grant from Keycloak.
     *
     * The direct grant API must be enabled for the configured realm
     * for this method to work. This function ostensibly provides a
     * non-interactive, programatic way to login to a Keycloak realm.
     *
     * This method can either accept a callback as the last parameter
     * or return a promise.
     *
     * @param {String} username The username.
     * @param {String} password The cleartext password.
     * @param {Function} callback Optional callback, if not using promises.
     * @param {String} scopeParam 作用域
     */
    obtainDirectly(username: any, password: any, callback: any, scopeParam?: string): Promise<any>;
    /**
     * Obtain a grant from a previous interactive login which results in a code.
     *
     * This is typically used by servers which receive the code through a
     * redirect_uri when sending a user to Keycloak for an interactive login.
     *
     * An optional session ID and host may be provided if there is desire for
     * Keycloak to be aware of this information.  They may be used by Keycloak
     * when session invalidation is triggered from the Keycloak console itself
     * during its postbacks to `/k_logout` on the server.
     *
     * This method returns or promise or may optionally take a callback function.
     *
     * @param {Object} ctx
     * @param {String} code The code from a successful login redirected from Keycloak.
     * @param {String} sessionId Optional opaque session-id.
     * @param {String} sessionHost Optional session host for targetted Keycloak console post-backs.
     * @param {Function} callback Optional callback, if not using promises.
     */
    obtainFromCode(ctx: {
        session: any;
    }, code: any, sessionId: any, sessionHost?: any, callback?: any): Promise<any>;
    /**
     * Obtain a service account grant.
     * Client option 'Service Accounts Enabled' needs to be on.
     *
     * This method returns or promise or may optionally take a callback function.
     *
     * @param {Function} callback Optional callback, if not using promises.
     * @param {String} scopeParam
     */
    obtainFromClientCredentials(callback: any, scopeParam?: string): Promise<any>;
    /**
     * Ensure that a grant is *fresh*, refreshing if required & possible.
     *
     * If the access_token is not expired, the grant is left untouched.
     *
     * If the access_token is expired, and a refresh_token is available,
     * the grant is refreshed, in place (no new object is created),
     * and returned.
     *
     * If the access_token is expired and no refresh_token is available,
     * an error is provided.
     *
     * The method may either return a promise or take an optional callback.
     *
     * @param {Grant} grant The grant object to ensure freshness of.
     * @param {Function} callback Optional callback if promises are not used.
     */
    ensureFreshness(grant: Grant, callback?: () => void): Promise<any>;
    /**
     * Perform live validation of an `access_token` against the Keycloak server.
     *
     * @param {Token|String} token The token to validate.
     * @param {Function} callback Callback function if not using promises.
     *
     * @return {boolean} `false` if the token is invalid, or the same token if valid.
     */
    validateAccessToken(token: {
        token: any;
    }, callback: any): Promise<any>;
    userInfo(token: {
        token: any;
    }, callback: any): Promise<any>;
    getAccount(args: any): any;
    isGrantRefreshable(grant: Grant): Token;
    /**
     * Create a `Grant` object from a string of JSON data.
     *
     * This method creates the `Grant` object, including
     * the `access_token`, `refresh_token` and `id_token`
     * if available, and validates each for expiration and
     * against the known public-key of the server.
     *
     * @param {String} rawData The raw JSON string received from the Keycloak server or from a client.
     * @return {Promise} A promise reoslving a grant.
     */
    createGrant(rawData: string): Promise<{}>;
    validateGrant(grant: Grant): Promise<{}>;
    /**
     * Validate a token.
     *
     * This method accepts a token, and returns a promise
     *
     * If the token is valid the promise will be resolved with the token
     *
     * If any of the following errors are seen the promise will resolve with undefined:
     *
     * - The token was undefined in the first place.
     * - The token is expired.
     * - The token is not expired, but issued before the current *not before* timestamp.
     * - The token signature does not verify against the known realm public-key.
     *
     * @return {Promise} That resolve a token
     */
    validateToken(token: any): Promise<{}>;
}
export default GrantManager;
