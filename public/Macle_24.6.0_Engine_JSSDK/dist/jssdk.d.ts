import { GeneralInvokeOption as GeneralInvokeOption_2 } from '../types';
import { IAnyStrObject as IAnyStrObject_2 } from '../types';

declare const APIS: {
    chooseImage(option?: nativeApi.ChooseImageOption | undefined): void | Promise<unknown>;
    getLocation(option?: nativeApi.GetLocationOptions | undefined): void | Promise<unknown>;
    previewImage(option: nativeApi.PreviewImageOption): void | Promise<unknown> | null;
    openDocument(option: nativeApi.OpenDocumentOption): void | Promise<unknown> | null;
    getStorage(option: nativeApi.GetStorageOption): void | Promise<unknown> | null;
    setStorage(option: nativeApi.SetStorageOption): void | Promise<unknown> | null;
    removeStorage(option: nativeApi.RemoveStorageOption): void | Promise<unknown> | null;
    clearStorage(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    getNetworkType(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    scanCode(option?: nativeApi.ScanCodeOption | undefined): void | Promise<unknown> | null;
    getLocalImgData(option: nativeApi.GetLocalImgDataOption): void | Promise<unknown> | null;
    callNativeAPI(apiName: string, inputParams: IAnyStrObject_2 | undefined, callback: nativeApi.NativeCallback): void;
    native(method: string, param?: IAnyStrObject_2 | undefined): Promise<unknown>;
    getStatusBarHeight(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    capsuleStyle(option: nativeApi.CapsuleStyleOption): void | "" | Promise<unknown> | null;
    hideLoading(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    showLoading(option?: nativeApi.ShowLoadingOption | undefined): void | "" | Promise<unknown>;
    showToast(option: nativeApi.ShowToastOption): void | "" | Promise<unknown> | null;
    gotoBrowser(option: nativeApi.GotoBrowserOption): void | "" | Promise<unknown> | null;
    saveFileToPhone(option: nativeApi.SaveFileToPhoneOption): void | "" | Promise<unknown> | null;
    saveImage(option: nativeApi.SaveImageOption): void | "" | Promise<unknown> | null;
    saveBase64Image(option: nativeApi.SaveBase64ImageOption): string | void | Promise<unknown> | null;
    chooseContact(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    isOnline(): boolean;
    request(option: nativeApi.RequestOption): void | Promise<unknown> | null;
    uploadFile(option: nativeApi.UploadFileOption): void | Promise<unknown> | null;
    downloadFile(option: nativeApi.downloadFileOption): void | Promise<unknown> | null;
    reportEvent(option: nativeApi.ReportEventOption): any;
    reportPerformance(option: nativeApi.ReportPerformanceOption): void | Promise<unknown> | null;
    reportLog(option: nativeApi.ReportLogOption): void | Promise<unknown> | null;
    submitReport(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    playAudio(option: nativeApi.PlayAudioOption): void | Promise<unknown> | null;
    getsmallappinfo(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    getBackgroundFetchData(option: nativeApi.getBackgroundFetchDataOption): void | Promise<unknown> | null;
    getLaunchOptionsSync(): any;
    navigateToMiniProgram(option: nativeApi.NavigateToMiniProgramOptions): any;
    exitMiniProgram(option: nativeApi.ExitMiniProgramOptions): any;
    stopAudio(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    getSystemInfoSync(): any;
    getOpenUserInfo(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    getAuthCode(option: nativeApi.GetAutoCodeOption): void | "" | Promise<unknown> | null;
    closeBLEConnection(option: nativeApi.CloseBLEConnectionOption): void | "" | Promise<unknown>;
    closeBluetoothAdapter(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    createBLEConnection(option: nativeApi.CreateBLEConnectionOption): void | "" | Promise<unknown>;
    getBLEDeviceCharacteristics(option: nativeApi.GetBLEDeviceCharacteristicsOption): void | "" | Promise<unknown>;
    getBLEDeviceServices(option: nativeApi.GetBLEDeviceServicesOption): void | "" | Promise<unknown>;
    openBluetoothAdapter(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    readBLECharacteristicValue(option: nativeApi.ReadBLECharacteristicValueOption): void | "" | Promise<unknown>;
    startBluetoothDevicesDiscovery(option: nativeApi.StartBluetoothDevicesDiscoveryOption): void | "" | Promise<unknown>;
    stopBluetoothDevicesDiscovery(option?: GeneralInvokeOption_2 | undefined): void | Promise<unknown>;
    writeBLECharacteristicValue(option: nativeApi.WriteBLECharacteristicValueOption): void | "" | Promise<unknown> | null;
    onBluetoothDeviceFound(listener: Function): void;
    offBluetoothDeviceFound(): void;
    tradePay(option: nativeApi.TradePayOptions): any;
    miniProgram: {
        navigateBackMiniProgram(): void;
        onWebviewEvent(): void;
        offWebviewEvent(): void;
        sendWebviewEvent(): void;
        onShow(): void;
        onHide(): void;
        onUnload(): void;
        getEnv(callback: (ret: {
            miniprogram: boolean;
        }) => void): void;
        navigateBack(option: miniProgramApi.NavigateBackOption): void;
        navigateTo(option: miniProgramApi.NavigateToOption): Promise<unknown> | null | undefined;
        redirectTo(option: miniProgramApi.RedirectToOption): Promise<unknown> | null | undefined;
        switchTab(option: miniProgramApi.SwitchTabOption): Promise<unknown> | null | undefined;
        reLaunch(option: miniProgramApi.ReLaunchOption): Promise<unknown> | null | undefined;
        postMessage(option: miniProgramApi.PostMessageOption): void;
        close(): void;
    };
};
export default APIS;

declare function callNativeAPI(apiName: string, inputParams: IAnyStrObject | undefined, callback: NativeCallback): void;

declare function capsuleStyle(option: CapsuleStyleOption): void | "" | Promise<unknown> | null;

declare interface CapsuleStyleOption extends Partial<GeneralInvokeOption> {
    style: number;
    invalidParamObj?: '';
}

declare function chooseContact(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function chooseImage(option?: ChooseImageOption): void | Promise<unknown>;

declare interface ChooseImageOption extends Partial<GeneralInvokeOption> {
    count: number;
    sizeType: Array<String>;
    sourceType: Array<String>;
}

declare function clearStorage(option?: GeneralInvokeOption): void | Promise<unknown>;

/**
 * 关闭小程序
 *
 * ```js
 *   ma.miniProgram.close()
 * ```
 */
declare function close_2(): void;

declare function closeBLEConnection(option: CloseBLEConnectionOption): void | "" | Promise<unknown>;

declare interface CloseBLEConnectionOption extends Partial<GeneralInvokeOption> {
    deviceId: string;
    invalidParamObj?: '';
}

declare function closeBluetoothAdapter(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function createBLEConnection(option: CreateBLEConnectionOption): void | "" | Promise<unknown>;

declare interface CreateBLEConnectionOption extends Partial<GeneralInvokeOption> {
    deviceId: string;
    timeout?: number;
    invalidParamObj?: '';
}

declare function downloadFile(option: downloadFileOption): void | Promise<unknown> | null;

declare interface downloadFileOption extends Partial<GeneralInvokeOption> {
    url: string;
    header?: Object;
    timeout?: number;
}

declare function exitMiniProgram(option: ExitMiniProgramOptions): any;

declare interface ExitMiniProgramOptions extends Partial<GeneralInvokeOption> {
    invalidParamObj?: any;
}

declare type GeneralCallback = (res: GeneralCallbackResult) => void;

declare interface GeneralCallbackResult {
    errMsg: string;
}

declare interface GeneralInvokeOption {
    success: GeneralCallback;
    fail: GeneralCallback;
    complete: GeneralCallback;
}

declare function getAuthCode(option: GetAutoCodeOption): void | "" | Promise<unknown> | null;

declare interface GetAutoCodeOption extends Partial<GeneralInvokeOption> {
    scopes: Array<string>;
    invalidParamObj?: '';
}

declare function getBackgroundFetchData(option: getBackgroundFetchDataOption): void | Promise<unknown> | null;

declare interface getBackgroundFetchDataOption extends Partial<GeneralInvokeOption> {
    fetchType: String;
}

declare function getBLEDeviceCharacteristics(option: GetBLEDeviceCharacteristicsOption): void | "" | Promise<unknown>;

declare interface GetBLEDeviceCharacteristicsOption extends Partial<GeneralInvokeOption> {
    deviceId: string;
    serviceId: string;
    invalidParamObj?: '';
}

declare function getBLEDeviceServices(option: GetBLEDeviceServicesOption): void | "" | Promise<unknown>;

declare interface GetBLEDeviceServicesOption extends Partial<GeneralInvokeOption> {
    deviceId: string;
    invalidParamObj?: '';
}

declare function getEnv(callback: GetEnvCallback): void;

declare type GetEnvCallback = (ret: {
    miniprogram: boolean;
}) => void;

declare function getLaunchOptionsSync(): any;

declare function getLocalImgData(option: GetLocalImgDataOption): void | Promise<unknown> | null;

declare interface GetLocalImgDataOption extends Partial<GeneralInvokeOption> {
    path: string;
}

/**
 * ```js
 *   ma.getLocation({
 *     useFetchData:false
 *     success(res) {},
 *     fail(res) {},
 *     complete(res) {},
 *   })
 * ```
 */
declare function getLocation(option?: GetLocationOptions): void | Promise<unknown>;

declare interface GetLocationOptions extends Partial<GeneralInvokeOption> {
    useFetchData?: boolean;
}

declare function getNetworkType(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function getOpenUserInfo(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function getsmallappinfo(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function getStatusBarHeight(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function getStorage(option: GetStorageOption): void | Promise<unknown> | null;

declare interface GetStorageOption extends Partial<GeneralInvokeOption> {
    key: string;
    encrypt?: boolean;
}

declare function getSystemInfoSync(): any;

declare function gotoBrowser(option: GotoBrowserOption): void | "" | Promise<unknown> | null;

declare interface GotoBrowserOption extends Partial<GeneralInvokeOption> {
    openUrl: string;
    invalidParamObj?: '';
}

declare function hideLoading(option?: GeneralInvokeOption): void | Promise<unknown>;

declare type IAnyStrObject = Record<string, any>;

declare function isOnline(): boolean;

declare namespace miniProgramApi {
    export {
        getEnv,
        navigateBack,
        NavigateBackOption,
        navigateTo,
        NavigateToOption,
        redirectTo,
        RedirectToOption,
        switchTab,
        SwitchTabOption,
        reLaunch,
        ReLaunchOption,
        postMessage_2 as postMessage,
        PostMessageOption,
        close_2 as close
    }
}

declare function native(method: string, param?: IAnyStrObject): Promise<unknown>;

declare namespace nativeApi {
    export {
        chooseImage,
        ChooseImageOption,
        getLocation,
        GetLocationOptions,
        previewImage,
        PreviewImageOption,
        openDocument,
        OpenDocumentOption,
        getStorage,
        GetStorageOption,
        setStorage,
        SetStorageOption,
        removeStorage,
        RemoveStorageOption,
        clearStorage,
        getNetworkType,
        scanCode,
        ScanCodeOption,
        getLocalImgData,
        GetLocalImgDataOption,
        callNativeAPI,
        NativeCallback,
        native,
        getStatusBarHeight,
        capsuleStyle,
        CapsuleStyleOption,
        hideLoading,
        showLoading,
        ShowLoadingOption,
        showToast,
        ShowToastOption,
        gotoBrowser,
        GotoBrowserOption,
        saveFileToPhone,
        SaveFileToPhoneOption,
        saveImage,
        SaveImageOption,
        saveBase64Image,
        SaveBase64ImageOption,
        chooseContact,
        isOnline,
        request,
        RequestOption,
        uploadFile,
        UploadFileOption,
        downloadFile,
        downloadFileOption,
        reportEvent,
        ReportEventOption,
        reportPerformance,
        ReportPerformanceOption,
        reportLog,
        ReportLogOption,
        submitReport,
        playAudio,
        PlayAudioOption,
        getsmallappinfo,
        getBackgroundFetchData,
        getBackgroundFetchDataOption,
        getLaunchOptionsSync,
        navigateToMiniProgram,
        NavigateToMiniProgramOptions,
        exitMiniProgram,
        ExitMiniProgramOptions,
        stopAudio,
        getSystemInfoSync,
        getOpenUserInfo,
        getAuthCode,
        GetAutoCodeOption,
        closeBLEConnection,
        CloseBLEConnectionOption,
        closeBluetoothAdapter,
        createBLEConnection,
        CreateBLEConnectionOption,
        getBLEDeviceCharacteristics,
        GetBLEDeviceCharacteristicsOption,
        getBLEDeviceServices,
        GetBLEDeviceServicesOption,
        openBluetoothAdapter,
        readBLECharacteristicValue,
        ReadBLECharacteristicValueOption,
        startBluetoothDevicesDiscovery,
        StartBluetoothDevicesDiscoveryOption,
        stopBluetoothDevicesDiscovery,
        writeBLECharacteristicValue,
        WriteBLECharacteristicValueOption,
        onBluetoothDeviceFound,
        offBluetoothDeviceFound,
        tradePay,
        TradePayOptions
    }
}

declare type NativeCallback = (res: any) => any;

/**
 * ```js
 *   ma.miniProgram.navigateTo({
 *     delta: 1,
 *     success: function(res) {},
 *     fail: function(res) {},
 *     complete: function(res) {},
 *   })
 * ```
 */
declare function navigateBack(option: NavigateBackOption): void;

declare interface NavigateBackOption extends Partial<GeneralInvokeOption> {
    delta: number;
}

/**
 * ```js
 *   ma.miniProgram.navigateTo({
 *     url: 'example?id=1',
 *     success: function(res) {},
 *     fail: function(res) {},
 *     complete: function(res) {},
 *   })
 * ```
 */
declare function navigateTo(option: NavigateToOption): Promise<unknown> | null | undefined;

declare function navigateToMiniProgram(option: NavigateToMiniProgramOptions): any;

declare interface NavigateToMiniProgramOptions extends Partial<GeneralInvokeOption> {
    appId: string;
    path?: string;
    params?: string;
    invalidParamObj?: any;
}

declare interface NavigateToOption extends Partial<GeneralInvokeOption> {
    url: string;
}

declare function offBluetoothDeviceFound(): void;

declare function onBluetoothDeviceFound(listener: Function): void;

declare function openBluetoothAdapter(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function openDocument(option: OpenDocumentOption): void | Promise<unknown> | null;

declare interface OpenDocumentOption extends Partial<GeneralInvokeOption> {
    filePath: string;
    fileType: string;
}

declare function playAudio(option: PlayAudioOption): void | Promise<unknown> | null;

declare interface PlayAudioOption extends Partial<GeneralInvokeOption> {
    url: string;
}

/**
 * 向小程序发送消息，会在特定时机（小程序后退、组件销毁）触发组件的 message 事件
 * 需要通过 bindmessage 接收
 *
 * ```js
 *   ma.miniProgram.postMessage({
 *     data: 'foo' | { foo: 'bar' },
 *     success: function(res) {},
 *     fail: function(res) {},
 *     complete: function(res) {},
 *   })
 * ```
 */
declare function postMessage_2(option: PostMessageOption): void;

declare interface PostMessageOption extends Partial<GeneralInvokeOption> {
    data: string | IAnyStrObject;
}

/**
 * js
 * ma.previewImage({
 urls: [],
 current: '',
 success() {},
 fail() {},
 complete() {}
 });
 */
declare function previewImage(option: PreviewImageOption): void | Promise<unknown> | null;

declare interface PreviewImageOption extends Partial<GeneralInvokeOption> {
    urls: Array<string>;
    current: string;
}

declare function readBLECharacteristicValue(option: ReadBLECharacteristicValueOption): void | "" | Promise<unknown>;

declare interface ReadBLECharacteristicValueOption extends Partial<GeneralInvokeOption> {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    invalidParamObj?: '';
}

/**
 * ```js
 *   ma.miniProgram.redirectTo({
 *     url: 'example?id=1',
 *     success: function(res) {},
 *     fail: function(res) {},
 *     complete: function(res) {},
 *   })
 * ```
 */
declare function redirectTo(option: RedirectToOption): Promise<unknown> | null | undefined;

declare interface RedirectToOption extends Partial<GeneralInvokeOption> {
    url: string;
}

/**
 * ```js
 *   ma.miniProgram.reLaunch({
 *     url: '/example',
 *     success: function(res) {},
 *     fail: function(res) {},
 *     complete: function(res) {},
 *   })
 * ```
 */
declare function reLaunch(option: ReLaunchOption): Promise<unknown> | null | undefined;

declare interface ReLaunchOption extends Partial<GeneralInvokeOption> {
    url: string;
}

declare function removeStorage(option: RemoveStorageOption): void | Promise<unknown> | null;

declare interface RemoveStorageOption extends Partial<GeneralInvokeOption> {
    key: string;
}

declare function reportEvent(option: ReportEventOption): any;

declare interface ReportEventOption {
    eventId: string;
    invalidParamObj?: any;
}

declare function reportLog(option: ReportLogOption): void | Promise<unknown> | null;

declare interface ReportLogOption {
    level: string;
    log: Object | string;
}

declare function reportPerformance(option: ReportPerformanceOption): void | Promise<unknown> | null;

declare interface ReportPerformanceOption {
    reportEvent: string;
    reportParams: Object;
}

declare function request(option: RequestOption): void | Promise<unknown> | null;

declare interface RequestOption extends Partial<GeneralInvokeOption> {
    url: string;
    data?: string | Object | ArrayBuffer;
    header?: IAnyStrObject;
    timeout?: number;
    method?: string;
    dataType?: string;
    preload?: GeneralCallback;
}

declare function saveBase64Image(option: SaveBase64ImageOption): string | void | Promise<unknown> | null;

declare interface SaveBase64ImageOption extends Partial<GeneralInvokeOption> {
    base64: string;
    invalidParamObj?: string;
}

declare function saveFileToPhone(option: SaveFileToPhoneOption): void | "" | Promise<unknown> | null;

declare interface SaveFileToPhoneOption extends Partial<GeneralInvokeOption> {
    content: string;
    fileName: string;
    invalidParamObj?: '';
}

declare function saveImage(option: SaveImageOption): void | "" | Promise<unknown> | null;

declare interface SaveImageOption extends Partial<GeneralInvokeOption> {
    content: string;
    invalidParamObj?: '';
}

declare function scanCode(option?: ScanCodeOption): void | Promise<unknown> | null;

declare interface ScanCodeOption extends Partial<GeneralInvokeOption> {
    onlyFromCamera: boolean;
    scanType: Array<string>;
}

declare function setStorage(option: SetStorageOption): void | Promise<unknown> | null;

declare interface SetStorageOption extends Partial<GeneralInvokeOption> {
    key: string;
    data: any;
    encrypt?: boolean;
}

declare function showLoading(option?: ShowLoadingOption): void | "" | Promise<unknown>;

declare interface ShowLoadingOption extends Partial<GeneralInvokeOption> {
    title?: string;
    mask?: Boolean;
    invalidParamObj?: '';
}

declare function showToast(option: ShowToastOption): void | "" | Promise<unknown> | null;

declare interface ShowToastOption extends Partial<GeneralInvokeOption> {
    title?: string;
    message?: string;
    icon?: string;
    duration?: number;
    mask?: Boolean;
    image?: string;
    invalidParamObj?: '';
}

declare function startBluetoothDevicesDiscovery(option: StartBluetoothDevicesDiscoveryOption): void | "" | Promise<unknown>;

declare interface StartBluetoothDevicesDiscoveryOption extends Partial<GeneralInvokeOption> {
    services?: Array<string>;
    invalidParamObj?: '';
}

declare function stopAudio(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function stopBluetoothDevicesDiscovery(option?: GeneralInvokeOption): void | Promise<unknown>;

declare function submitReport(option?: GeneralInvokeOption): void | Promise<unknown>;

/**
 * ```js
 *   ma.miniProgram.switchTab({
 *     url: '/example',
 *     success: function(res) {},
 *     fail: function(res) {},
 *     complete: function(res) {},
 *   })
 * ```
 */
declare function switchTab(option: SwitchTabOption): Promise<unknown> | null | undefined;

declare interface SwitchTabOption extends Partial<GeneralInvokeOption> {
    url: string;
}

declare function tradePay(option: TradePayOptions): any;

declare interface TradePayOptions {
    tradeNO: string;
    orderStr: string;
    sign: string;
    extendParam?: string;
    invalidParamObj?: any;
}

declare function uploadFile(option: UploadFileOption): void | Promise<unknown> | null;

declare interface UploadFileOption extends Partial<GeneralInvokeOption> {
    url: string;
    filePath?: string;
    files?: Array<string>;
    name: string;
    header?: Object;
    formData?: Object;
    timeout?: number;
}

declare function writeBLECharacteristicValue(option: WriteBLECharacteristicValueOption): void | "" | Promise<unknown> | null;

declare interface WriteBLECharacteristicValueOption extends Partial<GeneralInvokeOption> {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    value: ArrayBuffer;
    writeType?: string;
    invalidParamObj?: '';
}

export { }
