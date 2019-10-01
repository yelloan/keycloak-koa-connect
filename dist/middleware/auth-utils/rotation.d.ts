import Config from './config';
declare class Rotation {
    realmUrl: string;
    minTimeBetweenJwksRequests: number;
    jwks: any[];
    lastTimeRequestTime: number;
    constructor(config: Config);
    retrieveJWKs(callback?: (params: any) => any): Promise<any>;
    getJWK(kid: any): any;
    clearCache(): void;
}
export default Rotation;
