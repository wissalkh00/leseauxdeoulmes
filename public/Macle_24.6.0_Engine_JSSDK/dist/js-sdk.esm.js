/*Macle 24.6.0 jssdk v0.0.13  Fri Jun 28 2024*/
var _a, _b;
const userAgent = (_b = (_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase();

const isAndroid = (userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('android')) !== -1;

const CURRENT_ROUTE = Symbol(`currentRoute`);
const IS_INITD = Symbol(`isInitd`);
const TABBAR = Symbol(`tabBar`);
const CAN_NAVIGATE_TO = Symbol(`canNavigateTo`);
// 为了调试方便, 这里使用字符串常量 而不是 symbol 变量
// TODO: 后期增加 __DEV__ 能力之后, 生产态使用 Symbol
const MA_GLOBAL_KEY = `__ma__global__`;
const globalConfig = {
    [CURRENT_ROUTE]: ``,
    [IS_INITD]: false,
    [TABBAR]: null,
    [CAN_NAVIGATE_TO]: true
};
/**
 * 将变量和值挂到 window 上方便共享
 * 统一挂到 window.__ma__global__对象下, 相同的 key 会被覆盖
 */
window[MA_GLOBAL_KEY] = globalConfig;
function makeGlobal(key, val) {
    globalConfig[key] = val;
}
function getGlobal(key) {
    return window[MA_GLOBAL_KEY][key];
}

const MiniProgram = {
    NAVIGATE_TO: 'navigateTo',
    NAVIGATE_BACK: 'navigateBack',
    REDIRECT_TO: 'redirectTo',
    SWITCH_TAB: 'switchTab',
    RE_LAUNCH: 'reLaunch',
    POST_MESSAGE: 'postMessage',
    CLOSE: 'close'
};
const Native = {
    CHOOSE_IMAGE: 'chooseImage',
    GET_LOCAL_IMG_DATA: 'getLocalImgData',
    GET_LOCATION: 'getLocation',
    PREVIEW_IMAGE: 'previewImage',
    OPEN_DOCUMENT: 'openDocument',
    GET_STORAGE: 'getStorage',
    SET_STORAGE: 'setStorage',
    REMOVE_STORAGE: 'removeStorage',
    CLEAR_STORAGE: 'clearStorage',
    GET_NETWORK_TYPE: 'getNetworkType',
    SCAN_CODE: 'scanCode',
    GET_STATUS_BAR_HEIGHT: 'getStatusBarHeight',
    CAPSULE_STYLE: 'capsuleStyle',
    HIDE_LOADING: 'hideLoading',
    SHOW_LOADING: 'showLoading',
    SHOW_TOAST: 'showToast',
    GET_SMALL_APP_INFO: 'getsmallappinfo',
    GO_TO_BROWSER: 'gotoBrowser',
    SAVE_FILE_TO_PHONE: 'saveFileToPhone',
    SAVE_IMAGE: 'saveImage',
    SAVE_BASE64_IMAGE: 'saveBase64Image',
    CHOOSE_CONTACT: 'chooseContact',
    IS_ONLINE: 'isOnline',
    REQUEST: 'request',
    UPLOAD_FILE: 'uploadFile',
    DOWNLOAD_FILE: 'downloadFile',
    REPORT_EVENT: 'reportEvent',
    REPORT_PERFORMANCE: 'reportPerformance',
    REPORT_LOG: 'reportLog',
    SUBMIT_REPORT: 'submitReport',
    PLAY_VOICE: 'playVoice',
    PLAY_AUDIO: 'playAudio',
    GET_BACKGROUND_FETCH_DATA: 'getBackgroundFetchData',
    GET_LAUNCH_OPTIONS_SYNC: 'getLaunchOptionsSync',
    GET_SYSTEM_INFO_SYNC: 'getSystemInfoSync',
    NAVIGATE_TO_MINI_PROGRAM: 'navigateToMiniProgram',
    EXIT_MINI_PROGRAM: 'exitMiniProgram',
    STOP_AUOID: 'stopVoice',
    GET_OPEN_USER_INFO: 'getOpenUserInfo',
    GET_AUTH_CODE: 'getAuthCode',
    OPEN_BLUETOOTH_ADAPTER: 'openBluetoothAdapter',
    CLOSE_BLUETOOTH_ADAPTER: 'closeBluetoothAdapter',
    START_BLUETOOTH_DEVICES_DISCOVERY: 'startBluetoothDevicesDiscovery',
    STOP_BLUETOOTH_DEVICES_DISCOVERY: 'stopBluetoothDevicesDiscovery',
    CREATE_BLE_CONNECTION: 'createBLEConnection',
    CLOSE_BLE_CONNECTION: 'closeBLEConnection',
    GET_BLE_DEVICE_SERVICES: 'getBLEDeviceServices',
    GET_BLE_DEVICE_CHARACTERISTICS: 'getBLEDeviceCharacteristics',
    READ_BLE_CHARACTERISTIC_VALUE: 'readBLECharacteristicValue',
    WRITE_BLE_CHARACTERISTIC_VALUE: 'writeBLECharacteristicValue',
    ON_BLUETOOTH_DEVICE_FOUND: 'ON_BT_DEVICE_FOUND',
    OFF_BLUETOOTH_DEVICE_FOUND: 'offBluetoothDeviceFound',
    TRADE_PAY: 'tradePay'
};
const APINames = {
    MiniProgram,
    Native
};

const isWeb = window.parent.__simulatorConfig__ !== undefined;

class ApiMethod {
    constructor() {
        this.eventMap = new Map();
        this.callbackMap = new Map();
    }
    /**
     * 根据API名称添加回调
     * @param {String} apiName
     * @param {Function} handles
     */
    on(apiName, handles) {
        var _a;
        const callback = function (...args) {
            try {
                handles.apply(undefined, args);
            }
            catch (error) {
                console.error(error);
            }
        };
        this.callbackMap.set(handles, callback);
        if (this.eventMap.has(apiName)) {
            (_a = this.eventMap.get(apiName)) === null || _a === void 0 ? void 0 : _a.add(callback);
        }
        else {
            this.eventMap.set(apiName, new Set([callback]));
        }
    }
    /**
     * 根据API名称和handles，删除对应的回调
     * @param {String} apiName
     * @param {Function} handles
     */
    off(apiName, handles) {
        const apiEvent = this.eventMap.get(apiName);
        if (apiEvent) {
            if (!handles) {
                apiEvent.clear();
            }
            else {
                const callback = this.callbackMap.get(handles);
                apiEvent.delete(callback);
            }
        }
    }
    /**
     * 根据API名称获取回调列表
     * @param {String} apiName
     * @returns
     */
    get(apiName) {
        return this.eventMap.get(apiName);
    }
    /**
     * 根据API名称执行全部的相关回调
     * @param {String} apiName
     * @param {Object} params
     */
    emit(apiName, params) {
        const apiEvent = this.eventMap.get(apiName);
        if (apiEvent) {
            for (const callback of apiEvent) {
                callback.call(this, params);
            }
        }
    }
}
const apiMethod = new ApiMethod();

// invoke callbacks
const callbacks = {};
let callbackIndex = 0;
const defaultEventHandlers = {};
function invokeHandler(command, inputParams, callbackId) {
    if (isWeb) {
        window.simulatorWebkit.messageHandlers.invoke.postMessage({
            command,
            inputParams,
            callbackId,
            type: 'legacy'
        });
    }
    else if (isAndroid) {
        window.viewLayerNative.invoke(command, inputParams, callbackId);
    }
    else {
        window.webkit.messageHandlers.invoke.postMessage({
            command,
            inputParams,
            callbackId
        });
    }
}
function invoke(command, inputParams = {}, callback) {
    const paramsString = JSON.stringify(inputParams);
    const callbackId = ++callbackIndex;
    callbacks[callbackId] = callback;
    invokeHandler(command, paramsString, callbackId);
}
/**
 * 增加promise处理
 */
function beforeInvoke(apiName, opts = {}, innerFns = {}) {
    if (!opts.success && !opts.fail && !opts.complete) {
        return new Promise((resolve, reject) => {
            opts.success = resolve;
            opts.fail = reject;
            invokeMethod(apiName, opts, innerFns);
        });
    }
    return invokeMethod(apiName, opts, innerFns);
}
/**
 * 同步调用 Native方法, 利用 window.prompt hook
 * @param {*} command 同步调用方法名
 * @param {*} params 方法参数
 */
function invokeSync(command, params) {
    // 同步API统一包一层 data, 方便后续 parse
    const inputParams = JSON.stringify(Object.assign({ command }, params));
    // eslint-disable-next-line no-alert
    return window.prompt(inputParams);
}
/**
 * 统一封装调用逻辑, 通知 Native, 调用 API
 */
function invokeMethod(apiName, opts, innerCb = {}) {
    const invokeCbFnsObj = {};
    for (const name in opts) {
        if (typeof opts[name] === 'function') {
            invokeCbFnsObj[name] = opts[name];
            delete opts[name];
        }
    }
    invoke(apiName, opts, (invokeStatusCode, res) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const isOk = Number(invokeStatusCode) === 0;
        const isFail = [1, -1].includes(Number(invokeStatusCode));
        if (isOk) {
            (_a = innerCb === null || innerCb === void 0 ? void 0 : innerCb.beforeAll) === null || _a === void 0 ? void 0 : _a.call(innerCb, res);
            (_b = innerCb === null || innerCb === void 0 ? void 0 : innerCb.beforeSuccess) === null || _b === void 0 ? void 0 : _b.call(innerCb, res);
            (_c = invokeCbFnsObj.success) === null || _c === void 0 ? void 0 : _c.call(invokeCbFnsObj, res);
            (_d = innerCb === null || innerCb === void 0 ? void 0 : innerCb.afterSuccess) === null || _d === void 0 ? void 0 : _d.call(innerCb, res);
        }
        else if (isFail) {
            (_e = innerCb === null || innerCb === void 0 ? void 0 : innerCb.beforeFail) === null || _e === void 0 ? void 0 : _e.call(innerCb, res);
            (_f = invokeCbFnsObj.fail) === null || _f === void 0 ? void 0 : _f.call(invokeCbFnsObj, res);
            (_g = innerCb === null || innerCb === void 0 ? void 0 : innerCb.afterFail) === null || _g === void 0 ? void 0 : _g.call(innerCb, res);
        }
        else {
            (_h = innerCb === null || innerCb === void 0 ? void 0 : innerCb.beforeSuccess) === null || _h === void 0 ? void 0 : _h.call(innerCb, res);
            (_j = invokeCbFnsObj === null || invokeCbFnsObj === void 0 ? void 0 : invokeCbFnsObj.preload) === null || _j === void 0 ? void 0 : _j.call(invokeCbFnsObj, res);
        }
        if (isOk || isFail) {
            (_k = invokeCbFnsObj.complete) === null || _k === void 0 ? void 0 : _k.call(invokeCbFnsObj, res);
            (_l = innerCb === null || innerCb === void 0 ? void 0 : innerCb.afterAll) === null || _l === void 0 ? void 0 : _l.call(innerCb, res);
        }
    });
}
/**
 * Native notify Web Page invoke result
 *
 * => viewLayer.onInvokeFinished
 */
function onInvokeFinished(callbackId, invokeStatusCode, outputParams) {
    const callback = callbacks[callbackId];
    if (typeof callback === 'function') {
        callback(invokeStatusCode, outputParams);
    }
    if (Number(invokeStatusCode) !== 2) {
        delete callbacks[callbackId];
    }
}
function notifyNative(command, params = {}) {
    const inputParams = JSON.stringify(params);
    if (isWeb) {
        window.simulatorWebkit.messageHandlers.notifyNative.postMessage({
            command,
            inputParams,
            type: 'legacy'
        });
    }
    else if (isAndroid) {
        window.viewLayerNative.notifyNative(command, inputParams);
    }
    else {
        window.webkit.messageHandlers.notifyNative.postMessage({
            command,
            inputParams
        });
    }
}
// 监听基础事件
function onBasicEvent(event, handler) {
    defaultEventHandlers[event] = handler;
}
// 取消监听基础事件
function offBasicEvent(event) {
    defaultEventHandlers[event] = undefined;
}
// 执行注册的回调
function handlerCall(handler, webviewId, params) {
    if (typeof handler === 'function') {
        const webId = webviewId || params.webviewId || '';
        handler(params, webId);
    }
}
function onNativeNotify(event, webviewId, params) {
    // 执行注册的回调
    const handler = defaultEventHandlers[event];
    handlerCall(handler, webviewId, params);
}
const MacleJSBridge$1 = {
    invoke,
    invokeMethod,
    notifyNative,
    invokeSync,
    onNativeNotify,
    onBasicEvent,
    offBasicEvent
};
window.logicLayer = MacleJSBridge$1;

// subscribe handlers
const handlers = {};
const eventPrefix = 'ma_custom_event_';
/**
 * subscribe web event(user)
 */
function webSubscribe(eventName, handler) {
    handlers[eventName] = handler;
}
/**
 * subscribe custom event
 */
function subscribe(eventName, handler) {
    handlers[`${eventPrefix}${eventName}`] = handler;
}
/**
 * trigger event handler
 */
function subscribeHandler(eventName, data) {
    const handler = handlers[eventName];
    return handler(data);
}
function publish(eventName, params = {}) {
    const paramsString = JSON.stringify(params);
    publishHandler(`${eventPrefix}${eventName}`, paramsString);
}
function webPublish(eventName, params = {}) {
    const paramsString = JSON.stringify(params);
    publishHandler(eventName, paramsString);
}
/**
 * 通知 Native, 处理业务事件
 */
function publishHandler(eventName, paramsString) {
    if (isWeb) {
        window.simulatorWebkit.messageHandlers.notifyNative.postMessage({
            eventName,
            paramsString,
            type: 'legacy'
        });
    }
    else if (isAndroid) {
        window.viewLayerNative.notifyNative(eventName, paramsString);
    }
    else {
        window.webkit.messageHandlers.notifyNative.postMessage({
            eventName,
            paramsString
        });
    }
}

const MacleJSBridge = {
    invoke,
    invokeSync,
    invokeMethod,
    beforeInvoke,
    notifyNative,
    subscribe,
    webSubscribe,
    publish,
    webPublish,
    onBasicEvent
};

function onBTDeviceFound() {
    MacleJSBridge.onBasicEvent(APINames.Native.ON_BLUETOOTH_DEVICE_FOUND, function (params) {
        apiMethod.emit(APINames.Native.ON_BLUETOOTH_DEVICE_FOUND, params);
    });
}

function init() {
    // already initd
    if (getGlobal(IS_INITD)) {
        return;
    }
    makeGlobal(IS_INITD, true);
    try {
        // 增加蓝牙监听
        onBTDeviceFound();
        subscribe("getCurrentRoute" /* CUSTOM_EVENT.GET_CURRENT_ROUTE */, (data) => {
            makeGlobal(CURRENT_ROUTE, data.route);
            makeGlobal(TABBAR, data.tabBar);
            makeGlobal(CAN_NAVIGATE_TO, data.canNavigateTo !== undefined ? data.canNavigateTo : true);
        });
        publish("getCurrentRoute" /* CUSTOM_EVENT.GET_CURRENT_ROUTE */);
    }
    catch (error) { }
}

function getEnv(callback) {
    const miniprogram = window.__ma_environment === 'miniprogram';
    callback({
        miniprogram
    });
}

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
function navigateBack(option) {
    const fixedOption = Object.assign({ delta: 1 }, option);
    MacleJSBridge.beforeInvoke(APINames.MiniProgram.NAVIGATE_BACK, fixedOption);
}

class MacleApiError extends Error {
    constructor(apiName, reason) {
        const message = `${apiName} fail, ${reason}`;
        super(message);
        this.fileName = '';
        this.lineNumber = 1;
        this.columnNumber = -1;
        this.name = this.constructor.name;
        if (!this.stack) {
            return;
        }
        const [, fileName, lineNumber = 1, columnNumber] = this.stack.match(/\/([\/\w-_\.]+\.js):(\d*):(\d*)/) || [];
        this.fileName = fileName;
        this.lineNumber = Number(lineNumber);
        this.columnNumber = Number(columnNumber);
    }
}

const Enums = {
    MACLE_ERROR_LOG: 'MACLE_ERROR_LOG'
};

const reporter = {
    normalError(params) {
        console.error(params === null || params === void 0 ? void 0 : params.message);
        notifyNative(Enums.MACLE_ERROR_LOG, {
            key: params.key || 'MacleApiError',
            errorStack: params.message,
            apiName: params.apiName,
            keywords: params.keywords,
            fwkVersion: '',
            file: params.file,
            line: params.line,
            column: params.column,
            timestamp: Date.now()
        });
    }
};

/**
 * fix route
 * @param currentRoute 当前路由
 * @param toUrl 目标 url
 */
function getRealRoute(currentRoute, toUrl, isHtml = true) {
    let fixedUrl = toUrl;
    if (isHtml) {
        fixedUrl = addHTMLSuffix(fixedUrl);
    }
    if (fixedUrl.startsWith('/')) {
        return fixedUrl.substr('/'.length);
    }
    if (fixedUrl.startsWith('./')) {
        return getRealRoute(currentRoute, fixedUrl.substr('./'.length), false);
    }
    // 移除 url 前面的 ../ 并记录其位置
    let index;
    let urlArrLength;
    const urlArr = fixedUrl.split('/');
    for (index = 0, urlArrLength = urlArr.length; index < urlArrLength && urlArr[index] === '..'; index++)
        ;
    urlArr.splice(0, index);
    const pathArr = currentRoute.length > 0 ? currentRoute.split('/') : [];
    pathArr.splice(pathArr.length - index - 1, index + 1);
    return pathArr.concat(urlArr).join('/');
}
function encodeUrlQuery(url) {
    const urlArr = url.split('?');
    const [urlPath, queryUrl] = urlArr;
    if (!queryUrl) {
        return url;
    }
    const queryParams = queryUrl.split('&').reduce((res, cur) => {
        if (typeof cur === 'string' && cur.length > 0) {
            const curArr = cur.split('=');
            const key = curArr[0];
            const value = curArr[1];
            res[key] = value;
        }
        return res;
    }, Object.create(null));
    const urlQueryArr = [];
    for (const i in queryParams) {
        urlQueryArr.push(i + '=' + encodeURIComponent(queryParams[i]));
    }
    return urlQueryArr.length > 0 ? urlPath + '?' + urlQueryArr.join('&') : url;
}
function addHTMLSuffix(url) {
    const urlArr = url.split('?');
    urlArr[0] += '.html';
    return urlArr[1] === undefined ? urlArr[0] : `${urlArr[0]}?${urlArr[1]}`;
}
function checkUrl(apiName, options) {
    const tabBar = getGlobal(TABBAR);
    if (tabBar === null) {
        return true;
    }
    if (options.url.startsWith('/')) {
        options.url = options.url.slice('/'.length);
    }
    // 目标 url 是否在 tabbar 中
    const inTabBar = ((url) => tabBar === null || tabBar === void 0 ? void 0 : tabBar.list.find(e => url.indexOf(e.pagePath) === 0))(options.url);
    // navigateTo 和 redirectTo API 禁止跳转到 tabbar 页面
    if (apiName === APINames.MiniProgram.NAVIGATE_TO ||
        apiName === APINames.MiniProgram.REDIRECT_TO) {
        if (inTabBar) {
            reportErrorLog(apiName, `${apiName}: can not ${apiName} to a tabbar page`);
            return false;
        }
    }
    // switchTab 禁止跳转到非 tabbar 页面
    if (apiName === APINames.MiniProgram.SWITCH_TAB) {
        if (!inTabBar) {
            reportErrorLog(apiName, `${apiName}: can not ${apiName} to a non-tabbar page`);
            return false;
        }
    }
    return true;
}
function validateUrl(url) {
    return /^(http|https):\/\/.*/i.test(url);
}
function getDataType(data) {
    return Object.prototype.toString.call(data).split(' ')[1].split(']')[0];
}
function reportErrorLog(apiName, reason) {
    const err = new MacleApiError(apiName, reason);
    reporter.normalError({
        message: err.message,
        file: err.fileName,
        line: err.lineNumber,
        column: err.columnNumber
    });
    return err;
}
/**
 * 对象元素都转成字符串
 * @param {Object} obj
 * @returns
 */
function convertObjectValueToString(obj) {
    const newObj = {};
    for (const key in obj) {
        switch (getDataType(obj[key])) {
            case 'String':
                newObj[key] = obj[key];
                break;
            case 'Number':
                newObj[key] = `${obj[key]}`;
                break;
            case 'Boolean':
                newObj[key] = `${obj[key]}`;
                break;
            default:
                newObj[key] = JSON.stringify(obj[key]);
                break;
        }
    }
    return newObj;
}
/**
 * Get请求情况下，将参数拼接到url后
 * @param {String} url
 * @param {Object} data
 * @returns 把查询参数加到url后的值
 */
function addQueryStringToUrl(url, data) {
    if (isString(url) && isObject(data) && Object.keys(data).length) {
        const host = url.split('?')[0];
        const query = url.split('?')[1];
        const oldParams = {};
        if (query) {
            query.split('&').forEach(item => {
                if (item.length) {
                    oldParams[item.split('=')[0]] = item.split('=')[1];
                }
            });
        }
        const encodeData = {};
        for (const [key, value] of Object.entries(data)) {
            if (isObject(value)) {
                encodeData[key] = JSON.stringify(value);
            }
            else {
                encodeData[key] = value;
            }
        }
        return `${host}?${urlEncodeFormData(extend(oldParams, encodeData))}`;
    }
    return url;
}
function isArray(data) {
    return getDataType(data) === 'Array';
}
function isString(data) {
    return 'String' === getDataType(data);
}
function isObject(data) {
    return 'Object' === getDataType(data);
}
/**
 * 将参数进行转码后拼接成String
 * @param {Object} data
 * @returns 参数进行转码后拼接成String
 */
function urlEncodeFormData(data) {
    if (!isObject(data)) {
        return data;
    }
    const paramsArr = [];
    for (const key in data) {
        try {
            paramsArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        }
        catch (error) {
            paramsArr.push(`${key}=${data[key]}`);
        }
    }
    return paramsArr.join('&');
}
/**
 * 将obj合并到target对象
 * @param {IAnyStrObject} target
 * @param {IAnyStrObject} obj
 * @returns 合并后的对象
 */
function extend(target, obj) {
    for (const [key, value] of Object.entries(obj)) {
        target[key] = value;
    }
    return target;
}
// 统一构造能上报file、line和column的日志
function logErrorAndRunFail(apiName, params, reason) {
    var _a;
    const err = reportErrorLog(apiName, reason);
    if (!params.success && !params.fail && !params.complete) {
        return new Promise((resolve, reject) => {
            params.fail = reject;
            params.fail({ errMsg: err.message });
        });
    }
    for (const callback of ['fail', 'complete']) {
        const emptyFn = function () { };
        ((_a = params[callback]) === null || _a === void 0 ? void 0 : _a.call(params, { errMsg: err.message })) || emptyFn;
    }
    return null;
}
function paramCheck(apiName, params, paramTpl, name = 'parameter', required = false // 必填校验
) {
    let result = '';
    const pType = getDataType(params);
    const tplType = getDataType(paramTpl);
    if (pType !== tplType) {
        result = `${name} should be ${tplType} instead of ${pType};`;
        params.invalidParamObj = logErrorAndRunFail(apiName, params, result);
        return false;
    }
    if (tplType !== 'Object') {
        return true;
    }
    for (const [key, value] of Object.entries(paramTpl)) {
        if (Object.prototype.hasOwnProperty.call(params, key) || required) {
            const tplKeyType = getDataType(value);
            const pKeyType = getDataType(params[key]);
            if (tplKeyType !== pKeyType) {
                result += `${key} should be ${tplKeyType} instead of ${pKeyType};`;
            }
        }
    }
    if (!result) {
        return true;
    }
    params.invalidParamObj = logErrorAndRunFail(apiName, params, result);
    return false;
}
/**
 * 进阶版的参数校验，覆盖常见的通用校验场景
 */
function advanceParamCheck(apiName, params, paramTpl, options = {}, name = 'parameter') {
    const finalParamTpl = paramTplPreProcess(params, paramTpl, options); // 参数模板的前处理
    // 检查基本类型
    if (!paramCheck(apiName, params, finalParamTpl, name, true)) {
        return false;
    }
    return paramPostCheck(apiName, params, finalParamTpl, options, name);
}
/**
 * api参数等值的前处理
 */
function paramTplPreProcess(params, paramTpl, options = {}) {
    var _a;
    const finalParamTpl = Object.assign({}, paramTpl);
    for (let key in paramTpl) {
        // 可选参数，在未定义时不做任何相关校验
        if (params[key] === undefined && ((_a = options[key]) === null || _a === void 0 ? void 0 : _a.optional)) {
            delete finalParamTpl[key];
            delete options[key];
        }
    }
    return finalParamTpl;
}
/**
 * 参数后校验处理，判断空值等复杂场景
 */
function paramPostCheck(apiName, params, _paramTpl, options = {}, name = 'parameter') {
    let result = '';
    for (let key in options) {
        const paramValue = params[key];
        const { nonempty } = options[key];
        // 非空校验
        if (nonempty) {
            const isEmptyArr = isArray(paramValue) && !paramValue.length;
            const isEmptyStr = isString(paramValue) && !paramValue.trim();
            if (isEmptyArr || isEmptyStr) {
                result += `parameter error: ${key} cannot be empty;`;
            }
        }
    }
    if (result) {
        params.invalidParamObj = logErrorAndRunFail(apiName, params, result);
        return false;
    }
    return true;
}
function scopesCheck(scopes) {
    const validScopes = [
        'AUTH_BASE',
        'AUTH_USER',
        'SEND_MESSAGE',
        'USER_NICKNAME',
        'USER_NAME',
        'USER_LOGIN_ID',
        'PLAINTEXT_USER_LOGIN_ID',
        'HASH_LOGIN_ID',
        'USER_AVATAR',
        'USER_GENDER',
        'USER_BIRTHDAY',
        'USER_NATIONALITY',
        'USER_CONTACTINFO',
        'USER_ADDRESS',
        'PLAINTEXT_MOBILE_PHONE'
    ];
    const checkInvalidScopes = (scope) => {
        return validScopes.indexOf(`${scope}`.toUpperCase()) === -1;
    };
    return scopes.filter(checkInvalidScopes);
}
function requiredParamsCheck(requiredParams, params, apiName) {
    for (const [key, value] of Object.entries(requiredParams)) {
        // 仅支持null、undefined及过滤后空字符串的校验
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            params.invalidParamObj = logErrorAndRunFail(apiName, params, `parameter error: ${key} should be required instead of Undefined or empty.`);
            return false;
        }
    }
    return true;
}
function tranArrayBufferToUint8Array(data) {
    return Array.from(new Uint8Array(data));
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
function navigateTo(option) {
    if (!option.url) {
        return logErrorAndRunFail(APINames.MiniProgram.NAVIGATE_TO, option, 'parameter error:parameter.url should be String instead of Undefined.');
    }
    const fixedOption = option;
    fixedOption.url = getRealRoute(getGlobal(CURRENT_ROUTE), fixedOption.url);
    fixedOption.url = encodeUrlQuery(fixedOption.url);
    if (checkUrl(APINames.MiniProgram.NAVIGATE_TO, fixedOption)) {
        MacleJSBridge.beforeInvoke(APINames.MiniProgram.NAVIGATE_TO, fixedOption);
    }
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
function redirectTo(option) {
    if (!option.url) {
        return logErrorAndRunFail(APINames.MiniProgram.REDIRECT_TO, option, 'parameter error:parameter.url should be String instead of Undefined.');
    }
    const redirectToOption = option;
    redirectToOption.url = getRealRoute(getGlobal(CURRENT_ROUTE), redirectToOption.url);
    redirectToOption.url = encodeUrlQuery(redirectToOption.url);
    if (checkUrl(APINames.MiniProgram.REDIRECT_TO, redirectToOption)) {
        MacleJSBridge.beforeInvoke(APINames.MiniProgram.REDIRECT_TO, redirectToOption);
    }
}

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
function switchTab(option) {
    if (!option.url) {
        return logErrorAndRunFail(APINames.MiniProgram.SWITCH_TAB, option, 'parameter error:parameter.url should be String instead of Undefined.');
    }
    const switchToOption = option;
    switchToOption.url = getRealRoute(getGlobal(CURRENT_ROUTE), switchToOption.url);
    switchToOption.url = encodeUrlQuery(switchToOption.url);
    if (checkUrl(APINames.MiniProgram.SWITCH_TAB, switchToOption)) {
        MacleJSBridge.beforeInvoke(APINames.MiniProgram.SWITCH_TAB, switchToOption);
    }
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
function reLaunch(option) {
    if (!option.url) {
        return logErrorAndRunFail(APINames.MiniProgram.RE_LAUNCH, option, 'parameter error:parameter.url should be String instead of Undefined.');
    }
    const reLaunchOption = option;
    reLaunchOption.url = getRealRoute(getGlobal(CURRENT_ROUTE), reLaunchOption.url);
    reLaunchOption.url = encodeUrlQuery(reLaunchOption.url);
    if (checkUrl(APINames.MiniProgram.RE_LAUNCH, reLaunchOption)) {
        MacleJSBridge.beforeInvoke(APINames.MiniProgram.RE_LAUNCH, reLaunchOption);
    }
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
function postMessage(option) {
    MacleJSBridge.beforeInvoke(APINames.MiniProgram.POST_MESSAGE, option);
}

/**
 * 关闭小程序
 *
 * ```js
 *   ma.miniProgram.close()
 * ```
 */
function close() {
    MacleJSBridge.invokeMethod(APINames.MiniProgram.CLOSE);
}

var miniProgramApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  close: close,
  getEnv: getEnv,
  navigateBack: navigateBack,
  navigateTo: navigateTo,
  postMessage: postMessage,
  reLaunch: reLaunch,
  redirectTo: redirectTo,
  switchTab: switchTab
});

// 拍照或上传
function chooseImage(option) {
    const fixedOption = Object.assign({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera']
    }, option);
    return MacleJSBridge.beforeInvoke(APINames.Native.CHOOSE_IMAGE, fixedOption);
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
// 获取当前地理位置信息
function getLocation(option) {
    const fixedOption = Object.assign({
        useFetchData: false
    }, option);
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_LOCATION, fixedOption);
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
// 预览图片
function previewImage(option) {
    if (!(option === null || option === void 0 ? void 0 : option.urls)) {
        return logErrorAndRunFail(APINames.Native.PREVIEW_IMAGE, option, 'parameter error:parameter.urls should be Array instead of Undefined.');
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.PREVIEW_IMAGE, option);
}

// 打开文件，预览文件
function openDocument(option) {
    if (!(option === null || option === void 0 ? void 0 : option.filePath)) {
        return logErrorAndRunFail(APINames.Native.OPEN_DOCUMENT, option, 'parameter error:parameters.filePath should be String instead of Undefined.');
    }
    const validFileType = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf'
    ];
    if (option.fileType && validFileType.indexOf(option.fileType) === -1) {
        return logErrorAndRunFail(APINames.Native.OPEN_DOCUMENT, option, 'parameter error:parameter.fileType is invalid value.');
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.OPEN_DOCUMENT, option);
}

// 从本地缓存中获取指定key的内容
function getStorage(option) {
    if (!(option === null || option === void 0 ? void 0 : option.key)) {
        return logErrorAndRunFail(APINames.Native.GET_STORAGE, option, 'parameter error:parameters.key should be String instead of Undefined.');
    }
    const fixedOption = Object.assign({ encrypt: false }, option);
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_STORAGE, fixedOption);
}

// 将数据存储在本地缓存指定key中
function setStorage(option) {
    if (!(option === null || option === void 0 ? void 0 : option.key) || !option.data) {
        return logErrorAndRunFail(APINames.Native.SET_STORAGE, option, 'parameter error:parameter.key or parameter.data should not be Undefined.');
    }
    const fixedOption = Object.assign({ encrypt: false }, option);
    return MacleJSBridge.beforeInvoke(APINames.Native.SET_STORAGE, fixedOption);
}

// 从本地缓存中移除指定key
function removeStorage(option) {
    if (!(option === null || option === void 0 ? void 0 : option.key)) {
        return logErrorAndRunFail(APINames.Native.REMOVE_STORAGE, option, 'parameter error:parameter.key should be String instead of Undefined.');
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.REMOVE_STORAGE, option);
}

// 清理本地数据缓存
function clearStorage(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.CLEAR_STORAGE, option);
}

// 获取网络类型
function getNetworkType(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_NETWORK_TYPE, option);
}

// 扫描二维码
function scanCode(option) {
    // 校验scanType合法性
    const validScanType = [
        'barCode',
        'qrCode',
        'datamatrix',
        'pdf417'
    ];
    if ((option === null || option === void 0 ? void 0 : option.scanType) && option.scanType.length > 0) {
        if (!option.scanType.every(item => validScanType.indexOf(item) > -1)) {
            return logErrorAndRunFail(APINames.Native.SCAN_CODE, option, 'parameter error:parameter.scanType contains invalid values.');
        }
    }
    const fixedOption = Object.assign({
        onlyFromCamera: false,
        scanType: ['barCode', 'qrCode']
    }, option);
    return MacleJSBridge.beforeInvoke(APINames.Native.SCAN_CODE, fixedOption);
}

// 获取本地base64图片
function getLocalImgData(option) {
    if (!(option === null || option === void 0 ? void 0 : option.path)) {
        return logErrorAndRunFail(APINames.Native.GET_LOCAL_IMG_DATA, option, 'parameter error:parameter.path should be String instead of Undefined.');
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_LOCAL_IMG_DATA, option);
}

// h5调用native原生方法
function callNativeAPI(apiName, inputParams = {}, callback) {
    if (!callback || typeof callback !== 'function') {
        reportErrorLog(apiName, 'callback should be function!');
        return;
    }
    MacleJSBridge.invoke(apiName, inputParams, (invokeStatusCode, res) => {
        const isOk = Number(invokeStatusCode) === 0;
        if (!isOk) {
            reportErrorLog(apiName, `${res.errMsg}`);
            return;
        }
        callback(res);
    });
}

function native(method, param) {
    const finalParam = param || {};
    return new Promise((resolve, reject) => {
        callNativeAPI(method, finalParam, res => {
            resolve(res);
        });
    });
}

// 获取状态栏高度
function getStatusBarHeight(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_STATUS_BAR_HEIGHT, option);
}

//  设置胶囊样式,style 0：黑色，1：白色
function capsuleStyle(option) {
    if (paramCheck(APINames.Native.CAPSULE_STYLE, option, { style: 0 })) {
        const validStyle = [0, 1];
        if (validStyle.indexOf(option.style) === -1) {
            return logErrorAndRunFail(APINames.Native.CAPSULE_STYLE, option, `parameter error: invalid style ${option.style}`);
        }
        return MacleJSBridge.beforeInvoke(APINames.Native.CAPSULE_STYLE, option);
    }
    return option.invalidParamObj;
}

// 隐藏loading提示框
function hideLoading(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.HIDE_LOADING, option);
}

// 显示loading提示框，需主动调用ma.hideLoading才能关闭提示框
function showLoading(option) {
    const fixedOption = Object.assign({
        title: 'Loading...',
        mask: false
    }, option);
    if (paramCheck(APINames.Native.SHOW_LOADING, fixedOption, {
        title: '',
        mask: false
    })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.SHOW_LOADING, fixedOption);
    }
    return fixedOption.invalidParamObj;
}

// 显示loading提示框，需主动调用ma.hideLoading才能关闭提示框
function showToast(option) {
    var _a;
    if (!(option === null || option === void 0 ? void 0 : option.title) && !(option === null || option === void 0 ? void 0 : option.message)) {
        return logErrorAndRunFail(APINames.Native.SHOW_TOAST, option, 'parameter error: prompt message should be String instead of Undefined.');
    }
    option.title = (_a = option.title) !== null && _a !== void 0 ? _a : option.message;
    if (paramCheck(APINames.Native.SHOW_TOAST, option, {
        title: '',
        message: '',
        icon: '',
        duration: 0,
        mask: false,
        image: ''
    })) {
        // 校验icon合法性
        const validIcon = ['success', 'error', 'loading', 'none'];
        if ((option === null || option === void 0 ? void 0 : option.icon) && validIcon.indexOf(option === null || option === void 0 ? void 0 : option.icon) === -1) {
            return logErrorAndRunFail(APINames.Native.SHOW_TOAST, option, 'parameter error:parameter.icon contains invalid values.');
        }
        const fixedOption = Object.assign({
            icon: 'success',
            duration: 1500,
            mask: false
        }, option);
        return MacleJSBridge.beforeInvoke(APINames.Native.SHOW_TOAST, fixedOption);
    }
    return option.invalidParamObj;
}

// 跳转到第三方app
function gotoBrowser(option) {
    if (!option.openUrl) {
        return logErrorAndRunFail(APINames.Native.GO_TO_BROWSER, option, 'parameter error:parameter.openUrl should be String instead of Undefined.');
    }
    if (paramCheck(APINames.Native.GO_TO_BROWSER, option, {
        openUrl: ''
    })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.GO_TO_BROWSER, option);
    }
    return option.invalidParamObj;
}

// 保存图片到手机
function saveFileToPhone(option) {
    if (!option.content) {
        return logErrorAndRunFail(APINames.Native.SAVE_FILE_TO_PHONE, option, 'parameter error:parameter.content should be String instead of Undefined.');
    }
    if (!option.fileName) {
        return logErrorAndRunFail(APINames.Native.SAVE_FILE_TO_PHONE, option, 'parameter error:parameter.fileName should be String instead of Undefined.');
    }
    if (paramCheck(APINames.Native.SAVE_FILE_TO_PHONE, option, {
        content: '',
        fileName: ''
    })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.SAVE_FILE_TO_PHONE, option);
    }
    return option.invalidParamObj;
}

// 保存图片到相册
function saveImage(option) {
    if (!option.content) {
        return logErrorAndRunFail(APINames.Native.SAVE_IMAGE, option, 'parameter error:parameter.content should be String instead of Undefined.');
    }
    if (paramCheck(APINames.Native.SAVE_IMAGE, option, { content: '' })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.SAVE_IMAGE, option);
    }
    return option.invalidParamObj;
}

// 保存图片到相册
function saveBase64Image(option) {
    if (!option.base64) {
        return logErrorAndRunFail(APINames.Native.SAVE_BASE64_IMAGE, option, 'parameter error:parameter.base64 should be String instead of Undefined.');
    }
    if (paramCheck(APINames.Native.SAVE_BASE64_IMAGE, option, { base64: '' })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.SAVE_BASE64_IMAGE, option);
    }
    return option.invalidParamObj;
}

// 选择联系人
function chooseContact(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.CHOOSE_CONTACT, option);
}

// 判断当前的联网状态
function isOnline() {
    return window.navigator.onLine;
}

// 发起https请求
function request(option) {
    const errorMsg = validateParams(option);
    if (errorMsg) {
        return logErrorAndRunFail(APINames.Native.REQUEST, option, errorMsg);
    }
    if (option.header && !isObject(option.header)) {
        option.header = {};
    }
    option.header = convertObjectValueToString(option.header || {});
    for (const key in option.header) {
        if ('content-type' === key.toLowerCase()) {
            const value = option.header[key];
            delete option.header[key];
            option.header[key.toLowerCase()] = value;
        }
    }
    option.method = option.method ? option.method.toUpperCase() : 'GET';
    option.dataType = option.dataType || 'json';
    option.header['content-type'] =
        option.header['content-type'] || 'application/json';
    let data = '';
    if (option.data) {
        data = isObject(option.data) ? JSON.stringify(option.data) : option.data;
    }
    if ('GET' === option.method) {
        option.url = addQueryStringToUrl(option.url, option.data || {});
    }
    const fixOption = Object.assign({ data }, option);
    return MacleJSBridge.beforeInvoke(APINames.Native.REQUEST, fixOption, {
        beforeSuccess(res) {
            if (option.dataType !== 'json') {
                return;
            }
            try {
                if (res.data && isString(res.data)) {
                    res.data = JSON.parse(res.data);
                }
            }
            catch (e) {
                reportErrorLog(APINames.Native.REQUEST, `JSON parse data error from ${option.url}`);
            }
        }
    });
}
function validateParams(option) {
    let message = '';
    if (!option.url) {
        message =
            'parameter error: parameter.url should be String instead of Undefined.';
    }
    if (!validateUrl(option.url)) {
        message = `parameter error: invalid url ${option.url}`;
    }
    if (option.data && 'Function' === getDataType(option.data)) {
        message = 'parameter error: data should not be Function.';
    }
    return message;
}

// 将本地资源上传到服务器
function uploadFile(option) {
    if (!option.url) {
        return logErrorAndRunFail(APINames.Native.UPLOAD_FILE, option, 'parameter error: parameter.url should be String instead of Undefined.');
    }
    if (!option.files) {
        if (!option.filePath) {
            return logErrorAndRunFail(APINames.Native.UPLOAD_FILE, option, 'parameter error: parameter.filePath should be String instead of Undefined.');
        }
        if (!option.name) {
            return logErrorAndRunFail(APINames.Native.UPLOAD_FILE, option, 'parameter error: parameter.name should be String instead of Undefined.');
        }
    }
    else {
        option.filePath = '';
        option.name = '';
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.UPLOAD_FILE, option);
}

// 下载文件资源到本地
function downloadFile(option) {
    if (!option.url) {
        return logErrorAndRunFail(APINames.Native.DOWNLOAD_FILE, option, 'parameter error: parameter.url should be String instead of Undefined.');
    }
    if (!validateUrl(option.url)) {
        return logErrorAndRunFail(APINames.Native.DOWNLOAD_FILE, option, `parameter error: invalid url ${option.url}`);
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.DOWNLOAD_FILE, option);
}

const nonemptyParam$1 = { nonempty: true }; // 非空参数
// 自定义埋点上报
function reportEvent(option) {
    if (advanceParamCheck(APINames.Native.REPORT_EVENT, option, { eventId: '' }, { eventId: nonemptyParam$1 })) {
        return MacleJSBridge.notifyNative(APINames.Native.REPORT_EVENT, option);
    }
    return option.invalidParamObj;
}

// 性能指标上报
function reportPerformance(option) {
    if (!option.reportEvent || !isString(option.reportEvent)) {
        return logErrorAndRunFail(APINames.Native.REPORT_PERFORMANCE, option, 'parameter error:  parameter.reportEvent should be String instead of Undefined.');
    }
    if (!option.reportParams || !isObject(option.reportParams)) {
        return logErrorAndRunFail(APINames.Native.REPORT_PERFORMANCE, option, 'parameter error:  parameter.reportParams should be Object instead of Undefined.');
    }
    return MacleJSBridge.notifyNative(APINames.Native.REPORT_PERFORMANCE, option);
}

// 日志上报
function reportLog(option) {
    if (!option.log || !(isObject(option.log) || isString(option.log))) {
        return logErrorAndRunFail(APINames.Native.REPORT_LOG, option, 'parameter error:  parameter.log should be Object or String instead of Undefined.');
    }
    const validLevel = ['debug', 'info', 'error'];
    if (option.level && validLevel.indexOf(option.level) === -1) {
        return logErrorAndRunFail(APINames.Native.REPORT_LOG, option, `parameter error:  invalid level ${option.level}`);
    }
    if (isObject(option.log)) {
        option.log = JSON.stringify(option.log);
    }
    const fixedOption = Object.assign({
        level: 'info'
    }, option);
    return MacleJSBridge.notifyNative(APINames.Native.REPORT_LOG, fixedOption);
}

// 日志上报
function submitReport(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.SUBMIT_REPORT, option);
}

// 播放音频
function playAudio(option) {
    if (!option.url) {
        return logErrorAndRunFail(APINames.Native.PLAY_AUDIO, option, 'parameter error:parameter.url should be String instead of Undefined.');
    }
    if (!validateUrl(option.url)) {
        return logErrorAndRunFail(APINames.Native.PLAY_AUDIO, option, `parameter error: invalid url ${option.url}`);
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.PLAY_VOICE, option);
}

// 获取小程序基本信息
function getsmallappinfo(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_SMALL_APP_INFO, option);
}

// 数据预拉取
function getBackgroundFetchData(option) {
    if (!option.fetchType) {
        return logErrorAndRunFail(APINames.Native.GET_BACKGROUND_FETCH_DATA, option, 'parameter error:parameter.fetchType should be string instead of Undefined.');
    }
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_BACKGROUND_FETCH_DATA, option);
}

function getLaunchOptionsSync() {
    const retStr = MacleJSBridge.invokeSync(APINames.Native.GET_LAUNCH_OPTIONS_SYNC);
    return retStr && JSON.parse(retStr);
}

function navigateToMiniProgram(option) {
    if (!option.appId) {
        return logErrorAndRunFail(APINames.Native.NAVIGATE_TO_MINI_PROGRAM, option, 'parameter error:parameter.appId should be String instead of Undefined.');
    }
    if (paramCheck(APINames.Native.NAVIGATE_TO_MINI_PROGRAM, option, {
        appId: '',
        path: '',
        params: ''
    })) {
        if (!option.path && option.params) {
            return logErrorAndRunFail(APINames.Native.NAVIGATE_TO_MINI_PROGRAM, option, 'parameter error: there is params but no path.');
        }
        return MacleJSBridge.beforeInvoke(APINames.Native.NAVIGATE_TO_MINI_PROGRAM, option);
    }
    return option.invalidParamObj;
}

const optionalParam$1 = { optional: true }; // 可选参数
function exitMiniProgram(option) {
    if (advanceParamCheck(APINames.Native.EXIT_MINI_PROGRAM, option, { clearCache: false }, { clearCache: optionalParam$1 })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.EXIT_MINI_PROGRAM, option);
    }
    return option.invalidParamObj;
}

// 结束播放音频
function stopAudio(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.STOP_AUOID, option);
}

function getSystemInfoSync() {
    const res = MacleJSBridge.invokeSync(APINames.Native.GET_SYSTEM_INFO_SYNC);
    return res && JSON.parse(res);
}

// 获取用户公开信息
function getOpenUserInfo(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.GET_OPEN_USER_INFO, option);
}

// 获取登录凭证
function getAuthCode(option) {
    if (!option.scopes) {
        return logErrorAndRunFail(APINames.Native.GET_AUTH_CODE, option, 'parameter error:parameter.scopes should be Array<string> instead of Undefined.');
    }
    if (paramCheck(APINames.Native.GET_AUTH_CODE, option, { scopes: ['1'] })) {
        const invalidScopes = scopesCheck(option.scopes);
        if (invalidScopes.length > 0) {
            return logErrorAndRunFail(APINames.Native.GET_AUTH_CODE, option, `parameter error: invalid scopes ${invalidScopes}`);
        }
        return MacleJSBridge.beforeInvoke(APINames.Native.GET_AUTH_CODE, option);
    }
    return option.invalidParamObj;
}

// 关闭蓝牙低功耗设备
function closeBLEConnection(option) {
    if (!requiredParamsCheck({ deviceId: option.deviceId }, option, APINames.Native.CLOSE_BLE_CONNECTION)) {
        return option.invalidParamObj;
    }
    if (paramCheck(APINames.Native.CLOSE_BLE_CONNECTION, option, {
        deviceId: ''
    })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.CLOSE_BLE_CONNECTION, option);
    }
    return option.invalidParamObj;
}

// 关闭蓝牙模块
function closeBluetoothAdapter(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.CLOSE_BLUETOOTH_ADAPTER, option);
}

// 连接蓝牙低功耗设备
function createBLEConnection(option) {
    if (!requiredParamsCheck({ deviceId: option.deviceId }, option, APINames.Native.CREATE_BLE_CONNECTION)) {
        return option.invalidParamObj;
    }
    if (advanceParamCheck(APINames.Native.CREATE_BLE_CONNECTION, option, { deviceId: '', timeout: 0 }, { timeout: { optional: true } })) {
        const fixedOption = Object.assign({
            timeout: 30000
        }, option);
        return MacleJSBridge.beforeInvoke(APINames.Native.CREATE_BLE_CONNECTION, fixedOption);
    }
    return option.invalidParamObj;
}

// 获取蓝牙低功耗设备某个服务中所有特征 (characteristic)
function getBLEDeviceCharacteristics(option) {
    if (!requiredParamsCheck({ deviceId: option.deviceId, serviceId: option.serviceId }, option, APINames.Native.GET_BLE_DEVICE_CHARACTERISTICS)) {
        return option.invalidParamObj;
    }
    if (paramCheck(APINames.Native.GET_BLE_DEVICE_CHARACTERISTICS, option, {
        deviceId: '',
        serviceId: ''
    })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.GET_BLE_DEVICE_CHARACTERISTICS, option);
    }
    return option.invalidParamObj;
}

// 获取蓝牙低功耗设备所有服务 (service)
function getBLEDeviceServices(option) {
    if (!requiredParamsCheck({ deviceId: option.deviceId }, option, APINames.Native.GET_BLE_DEVICE_SERVICES)) {
        return option.invalidParamObj;
    }
    if (paramCheck(APINames.Native.GET_BLE_DEVICE_SERVICES, option, {
        deviceId: ''
    })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.GET_BLE_DEVICE_SERVICES, option);
    }
    return option.invalidParamObj;
}

// 初始化蓝牙模块
function openBluetoothAdapter(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.OPEN_BLUETOOTH_ADAPTER, option);
}

// 读取蓝牙低功耗设备特征值的二进制数据。注意：必须设备的特征支持 read 才可以成功调用
function readBLECharacteristicValue(option) {
    if (!requiredParamsCheck({
        deviceId: option.deviceId,
        serviceId: option.serviceId,
        characteristicId: option.characteristicId
    }, option, APINames.Native.READ_BLE_CHARACTERISTIC_VALUE)) {
        return option.invalidParamObj;
    }
    if (paramCheck(APINames.Native.READ_BLE_CHARACTERISTIC_VALUE, option, {
        deviceId: '',
        serviceId: '',
        characteristicId: ''
    })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.READ_BLE_CHARACTERISTIC_VALUE, option);
    }
    return option.invalidParamObj;
}

// 开始搜寻附近的蓝牙外围设备
function startBluetoothDevicesDiscovery(option) {
    if (advanceParamCheck(APINames.Native.START_BLUETOOTH_DEVICES_DISCOVERY, option, { services: ['1'] }, { services: { optional: true } })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.START_BLUETOOTH_DEVICES_DISCOVERY, option);
    }
    return option.invalidParamObj;
}

// 停止搜寻附近的蓝牙外围设备
function stopBluetoothDevicesDiscovery(option) {
    return MacleJSBridge.beforeInvoke(APINames.Native.STOP_BLUETOOTH_DEVICES_DISCOVERY, option);
}

// 向蓝牙低功耗设备特征值中写入二进制数据。注意：必须设备的特征支持 write 才可以成功调用
function writeBLECharacteristicValue(option) {
    const { deviceId, serviceId, characteristicId, value, writeType } = option;
    const requiredParamField = { deviceId, serviceId, characteristicId, value };
    writeType !== undefined && (requiredParamField.writeType = writeType);
    if (!requiredParamsCheck(requiredParamField, option, APINames.Native.WRITE_BLE_CHARACTERISTIC_VALUE)) {
        return option.invalidParamObj;
    }
    if (paramCheck(APINames.Native.WRITE_BLE_CHARACTERISTIC_VALUE, option, {
        deviceId: '',
        serviceId: '',
        characteristicId: '',
        value: new ArrayBuffer(8),
        writeType: ''
    })) {
        const validWriteType = [
            'write',
            'writeNoResponse',
            'signedWrite'
        ];
        if ((option === null || option === void 0 ? void 0 : option.writeType) && validWriteType.indexOf(option === null || option === void 0 ? void 0 : option.writeType) === -1) {
            return logErrorAndRunFail(APINames.Native.WRITE_BLE_CHARACTERISTIC_VALUE, option, 'parameter error:parameter.writeType contains invalid values.');
        }
        const finalValue = tranArrayBufferToUint8Array(option.value);
        const finalOption = Object.assign(Object.assign({}, option), { value: finalValue });
        return MacleJSBridge.beforeInvoke(APINames.Native.WRITE_BLE_CHARACTERISTIC_VALUE, finalOption);
    }
    return option.invalidParamObj;
}

const apiName = 'onBluetoothDeviceFound';
// 监听搜索到新设备的事件。
function onBluetoothDeviceFound(listener) {
    if (getDataType(listener) !== 'Function') {
        reportErrorLog(apiName, 'callback is not a function');
        return;
    }
    apiMethod.on(APINames.Native.ON_BLUETOOTH_DEVICE_FOUND, listener);
}

// 移除搜索到新设备的事件的全局监听函数。
function offBluetoothDeviceFound() {
    apiMethod.off(APINames.Native.ON_BLUETOOTH_DEVICE_FOUND);
}

const nonemptyParam = { nonempty: true }; // 非空参数
const optionalParam = { optional: true }; // 可选参数
// 快速接入支付
function tradePay(option) {
    if (advanceParamCheck(APINames.Native.TRADE_PAY, option, { tradeNO: '', orderStr: '', sign: '', extendParam: '' }, { tradeNO: nonemptyParam, orderStr: nonemptyParam, sign: nonemptyParam, extendParam: optionalParam })) {
        return MacleJSBridge.beforeInvoke(APINames.Native.TRADE_PAY, option);
    }
    return option.invalidParamObj;
}

var nativeApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  callNativeAPI: callNativeAPI,
  capsuleStyle: capsuleStyle,
  chooseContact: chooseContact,
  chooseImage: chooseImage,
  clearStorage: clearStorage,
  closeBLEConnection: closeBLEConnection,
  closeBluetoothAdapter: closeBluetoothAdapter,
  createBLEConnection: createBLEConnection,
  downloadFile: downloadFile,
  exitMiniProgram: exitMiniProgram,
  getAuthCode: getAuthCode,
  getBLEDeviceCharacteristics: getBLEDeviceCharacteristics,
  getBLEDeviceServices: getBLEDeviceServices,
  getBackgroundFetchData: getBackgroundFetchData,
  getLaunchOptionsSync: getLaunchOptionsSync,
  getLocalImgData: getLocalImgData,
  getLocation: getLocation,
  getNetworkType: getNetworkType,
  getOpenUserInfo: getOpenUserInfo,
  getStatusBarHeight: getStatusBarHeight,
  getStorage: getStorage,
  getSystemInfoSync: getSystemInfoSync,
  getsmallappinfo: getsmallappinfo,
  gotoBrowser: gotoBrowser,
  hideLoading: hideLoading,
  isOnline: isOnline,
  native: native,
  navigateToMiniProgram: navigateToMiniProgram,
  offBluetoothDeviceFound: offBluetoothDeviceFound,
  onBluetoothDeviceFound: onBluetoothDeviceFound,
  openBluetoothAdapter: openBluetoothAdapter,
  openDocument: openDocument,
  playAudio: playAudio,
  previewImage: previewImage,
  readBLECharacteristicValue: readBLECharacteristicValue,
  removeStorage: removeStorage,
  reportEvent: reportEvent,
  reportLog: reportLog,
  reportPerformance: reportPerformance,
  request: request,
  saveBase64Image: saveBase64Image,
  saveFileToPhone: saveFileToPhone,
  saveImage: saveImage,
  scanCode: scanCode,
  setStorage: setStorage,
  showLoading: showLoading,
  showToast: showToast,
  startBluetoothDevicesDiscovery: startBluetoothDevicesDiscovery,
  stopAudio: stopAudio,
  stopBluetoothDevicesDiscovery: stopBluetoothDevicesDiscovery,
  submitReport: submitReport,
  tradePay: tradePay,
  uploadFile: uploadFile,
  writeBLECharacteristicValue: writeBLECharacteristicValue
});

const APIS = Object.assign({ 
    // miniapp
    miniProgram: Object.assign(Object.assign({}, miniProgramApi), { navigateBackMiniProgram() { },
        onWebviewEvent() { },
        offWebviewEvent() { },
        sendWebviewEvent() { },
        onShow() { },
        onHide() { },
        onUnload() { } }) }, nativeApi);

// 执行初始化逻辑
document.readyState !== 'loading'
    ? init()
    : document.addEventListener('DOMContentLoaded', init);
// 增加全局运行js error 监听
window.onerror = function (message, url, line, column, error) {
    reporter.normalError({
        key: 'thirdPageParamsError',
        message,
        file: url,
        line,
        column
    });
};
/**
 * Support use ma.api from window
 */
window.ma = APIS;
window.viewLayer = {
    onInvokeFinished,
    subscribeHandler
};

export { APIS as default };
//# sourceMappingURL=js-sdk.esm.js.map
