import { LookerExtensionSDK as _LookerExtensionSDK, Looker40SDK } from '@looker/sdk';
import { ApiVersion } from '../connect';
import { SdkConnection } from './sdk_connection';
export class LookerExtensionSDK {
  static create40Client(hostConnection) {
    return _LookerExtensionSDK.createClient(new SdkConnection(hostConnection, ApiVersion.sdk40), Looker40SDK);
  }
  static createClient(hostConnection) {
    return LookerExtensionSDK.create40Client(hostConnection);
  }
}
//# sourceMappingURL=extension_sdk.js.map