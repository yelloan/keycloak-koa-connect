import Grant from './middleware/auth-utils/grant.js';
import Config from './middleware/auth-utils/config';
import GrantManager from './middleware/auth-utils/grant-manager';
import { Middleware, Context } from 'koa';
import IConfig from './interface/iconfig';
/**
 * Instantiate a Keycloak.
 *
 * The `config` and `keycloakConfig` hashes are both optional.
 *
 * The `config` hash, if provided, may include either `store`, pointing
 * to the actual session-store used by your application, or `cookies`
 * with boolean `true` as the value to support using cookies as your
 * authentication store.
 *
 * A session-based store is recommended, as it allows more assured control
 * from the Keycloak console to explicitly logout some or all sessions.
 *
 * In all cases, also, authentication through a Bearer authentication
 * header is supported for non-interactive APIs.
 *
 * The `keycloakConfig` object, by default, is populated by the contents of
 * a `keycloak.json` file installed alongside your application, copied from
 * the Keycloak administration console when you provision your application.
 *
 * @constructor
 *
 * @param      {Object}    config          Configuration for the Keycloak connector.
 * @param      {Object}    keycloakConfig  Keycloak-specific configuration.
 *
 * @return     {Keycloak}  A constructed Keycloak object.
 *
 */
declare class Keycloak {
    config: Config;
    grantManager: GrantManager;
    stores: any;
    constructor(config?: IConfig, keycloakConfig?: string | object);
    /**
     * Obtain an array of middleware for use in your application.
     *
     * Generally this should be installed at the root of your application,
     * as it provides general wiring for Keycloak interaction, without actually
     * causing Keycloak to get involved with any particular URL until asked
     * by using `protect(...)`.
     *
     * Example:
     *
     *     var app = express();
     *     var keycloak = new Keycloak();
     *     app.use( keycloak.middleware() );
     *
     * Options:
     *
     *  - `logout` URL for logging a user out. Defaults to `/logout`.
     *  - `admin` Root URL for Keycloak admin callbacks.  Defaults to `/`.
     *
     * @param {Object} options Optional options for specifying details.
     */
    middleware(options?: {
        logout: '';
        admin: '';
    }): Middleware[];
    protect(spec?: any): (ctx: Context, next: () => Promise<any>) => any;
    authenticated(ctx: any): void;
    eauthenticated(ctx: any): void;
    accessDenied(ctx: {
        throw: (arg0: number, arg1: string) => void;
    }): void;
    getGrant(ctx: any): Promise<void | Grant>;
    storeGrant(grant: any, ctx: Context): any;
    unstoreGrant(sessionId: any): void;
    getGrantFromCode(code: any, ctx: any): Promise<any>;
    loginUrl(uuid: string, redirectUrl: string): string;
    logoutUrl(redirectUrl: string): string;
    accountUrl(): string;
    getAccount(token: any): any;
    redirectToLogin(ctx: any): boolean;
}
export default Keycloak;
