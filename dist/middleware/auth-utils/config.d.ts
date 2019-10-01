/**
 * 读取配置文件
 * Created by zhangsong on 2018/8/9.
 */
/// <reference types="node" />
/**
 * Construct a configuration object.
 * A configuration object may be constructed with either
 * a path to a `keycloak.json` file (which defaults to
 * `$PWD/keycloak.json` if not present, or with a configuration
 * object akin to what parsing `keycloak.json` provides.
 * @param {String|Object} config Configuration path or details.
 * @constructor
 */
declare class Config {
    realm: string;
    clientId: string;
    secret: any;
    public: any;
    authServerUrl: string;
    realmUrl: string;
    realmAdminUrl: string;
    minTimeBetweenJwksRequests: any;
    bearerOnly: any;
    publicKey: string;
    scope: string;
    constructor(config: string | object);
    /**
     * 根据路径加载配置文件
     * @param {String} configPath Path to a `keycloak.json` configuration.
     */
    loadConfiguration(configPath: string | number | Buffer | import('url').URL): void;
    /**
     * Configure this `Config` object.
     *
     * This will set the internal configuration details.  The details
     * may come from a `keycloak.json` formatted object (with names such
     * as `auth-server-url`) or from an existing `Config` object (using
     * names such as `authServerUrl`).
     *
     * @param {Object} config The configuration to instill.
     */
    configure(config: any): void;
}
export default Config;
