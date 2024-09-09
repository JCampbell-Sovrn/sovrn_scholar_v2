import { Looker40SDK } from '@looker/sdk';
import type { ExtensionHostApi } from '../connect';
export declare class LookerExtensionSDK {
    static create40Client(hostConnection: ExtensionHostApi): Looker40SDK;
    static createClient(hostConnection: ExtensionHostApi): Looker40SDK;
}
