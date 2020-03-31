import axios from 'axios';
import Vue from 'vue';
import store from '../store';
import ajaxToken from './ajaxToken';
let qs = require('qs');

// axios.defaults.timeout = 120000; // 超时时间，单位ms，这里设置为2分钟
class Http {
  instance = axios.create(); // axios对象

    _default = { // 默认配置
        isShowLoading: true,
        isAutoToast: true,
        loadingTitle: '请求中..'
    };

    iCount = 0; // 计时器，用于计算并发的loading，为0的时候，才要loading.hide()
    timer = 0; // 延迟对象
    ajaxKeyName = 0; // 每个ajax的命名，按照顺序累加1

    vueVm = new Vue();

    constructor () {
        window._axiosPromiseArr = {};
        this.requestInterce();
        this.responseInterce();
    }

    /**
     * 计数器累加并展示loading
     */
    countShowLoading (text = '') {
        this.iCount++;
        this.showLoading(text);
    }

    /**
     * 展示loading
     */
    showLoading (text = '') {
        this.vueVm.$showLoading(text);
    }

    /**
     * loading移除
     * immediate 是否立刻移除所有的loading
     */
    hideLoading (immediate = false) {
        this.timer && clearTimeout(this.timer);
        this.iCount > 0 && this.iCount--;
        if (immediate || this.iCount === 0) {
            this.iCount = 0;
            this.timer = setTimeout(() => {
                if (this.iCount === 0) {
                    this.vueVm.$hideLoading();
                }
            }, 100); // 100ms内如果有新的ajax请求，iCount+1了，这里就不为0，认为有一起的请求
        }
    }

    /**
     * request拦截器
     */
    requestInterce () {
        this.instance.interceptors.request.use((config) => {
            // 生产axios.cancelToken，用于取消axios请求
            this.ajaxKeyName++;
            let source = axios.CancelToken.source();
            config.cancelToken = source.token;
            config.ajaxKeyName = this.ajaxKeyName; // 配置到config里面，才可以在response的config中获取
            ajaxToken.saveAxiosQueue({ // 存到json变量中，在页面切换或者需要取消所有axios的时候才有用到
                axiosKeyName: this.ajaxKeyName,
                axiosCancel: source.cancel
            });
            // 如果传了getCancelTokenName函数，则将cancelToken的名称作为参数传过去，这样外界就可以通过这个cancelToken取消axios
            if (typeof config.getCancelTokenName === 'function') {
                config.getCancelTokenName(this.ajaxKeyName);
            }

            if (config.isShowLoading) {
                this.countShowLoading(config.loadingTitle);
            }
            // 从vuex中拿登录信息，store.state.loginInfo
            let ssoclient = store.state.loginInfo && store.state.loginInfo.ssoclient;
            if (config.method === 'post') {
                let data = qs.parse(config.data);
                config.data = qs.stringify({
                    ...data,
                    ssoclient,
                    channel: 20, // app:10 web:20 美信:30 小程序:40 美云销50
                    clientType: 1
                });
            } else if (config.method === 'get') {
                config.params = {
                    ...config.params,
                    ssoclient,
                    channel: 20, // app:10 web:20 美信:30 小程序:40 美云销50
                    clientType: 1
                };
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    /**
     * response拦截器
     */
    responseInterce () {
        this.instance.interceptors.response.use(response => {
            if (response.config.isShowLoading && this.iCount !== 0) {
                this.hideLoading();
            }
            // 如果有带cancelToken的，要把队列里的移除掉，以队列过多
            if (response.config.ajaxKeyName) {
                ajaxToken.removeAxiosQueueByName(response.config.ajaxKeyName);
            }
            if (response.data.isSuccess) {
                return Promise.resolve(response.data); // isSuccess = true
            } else {
                if (response.config.isAutoToast) {
                    this.vueVm.$showToast(response.data.message || '异常:接口没有返回message字段');
                }
                this.hideLoading(true);
                return Promise.resolve(response.data); // isSuccess=false
            }
        }, (error) => {
            console.log('error', error.response, error.request);
            // 一旦报错，就直接停掉loading
            this.hideLoading(true);
            if (error.response) {
                this.vueVm.$showToast(`请求服务失败,返回状态：${error.response.status}`); // 请求已发送，服务器回复状态码在2xx之外
            } else if (error.request) {
                this.vueVm.$showToast(`请求服务异常：无响应`); // 请求已发送，但没有收到回应，可能断网或者后台停服务
            } else {
                // 请求尚未发送就失败了，可以认为是某些设置引发的问题（代码问题、跨域、断网）
                // 建议错误在这里拦截处理，中断promise
                // return new Promise(() => {})
                console.error(error);
            }
            return Promise.reject(error);
        });
    }

    /**
     * 提供给外部调用-封装Post请求
     * @params {String} url 请求的字符串
     * @param {JSON} data 请求带的参数
     * @param {JSON} config 配置信息，比如是否要出现弹窗等等
     * 目前只支持isShowLoaing/loadingTitle
     * @return {Promise} 返回一个promise，ajax调用成功返回数据时resolve
     */
    post (url, params = {}, config = {}) {
        return this.instance.post(url, params, Object.assign({}, this._default, config));
    }

    /**
     * 提供给外部调用-封装Get请求
     * @params {String} url 请求的字符串
     * @param {JSON} data 请求带的参数
     * @param {JSON} config 配置信息，比如是否要出现弹窗等等
     * 目前只支持isShowLoaing/loadingTitle
     * @return {Promise} 返回一个promise，ajax调用成功返回数据时resolve
     */
    get (url, params = {}, config = {}) {
        return this.instance.get(url, {
            params,
            ...Object.assign({}, this._default, config)
        });
    }

    /**
     * 提供给外部调用-formData提交
     */
    postFormData (url, params = {}, config = {}) {
        // 从vuex中拿登录信息，store.state.loginInfo
        let ssoclient = store.state.loginInfo && store.state.loginInfo.ssoclient;
        url = `${url}?ssoclient=${ssoclient}&clientType=1`;
        return this.instance.post(url, params, {
            ...Object.assign({}, this._default, config),
            headers: {
                'enctype': 'multipart/form-data'
            },
            data: params,
            onUploadProgress: (progressEvent) => { // 上传进度
                if (progressEvent.lengthComputable) {
                    // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                    this.showLoading(`上传中：${Math.floor(progressEvent.loaded / progressEvent.total * 100)}%`);
                    if (progressEvent.loaded === progressEvent.total) {
                        // 上传完成，并不登录接口请求完成
                        // 比如ocr的时候，上传已经结束，后台可能调用其他后台去做识别又要花时间，我们只能知道前端和自己后台的上传进度
                        this.showLoading('上传完成,正在处理..');
                    }
                }
            },
            transformRequest: [function () { // 上传前组装数组
                let fd = new FormData();
                for (let i in params) {
                    if (params.hasOwnProperty(i)) {
                        fd.append(i, params[i]);
                    }
                }
                return fd;
            }]
        });
    }
}

export default new Http();
