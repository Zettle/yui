import Vue from 'vue';
import ToastCom from './toastCom';

// let instance = new Vue(ToastCom).$mount(document.createElement('div'));
// let toastTimer = null;
let _default = {
    duration: 2000,
    isMask: true
};

let toastQueue = []; // 存toast实例的队列

class ShowToastClass {
    constructor () {
        this.instance = new Vue(ToastCom).$mount(document.createElement('div'));
        document.body.appendChild(this.instance.$el); // 添加到DOM中
    }

    show (tipTxtOrOption, duration, isMask) {
        return new Promise(resolve => {
            if (typeof tipTxtOrOption === 'string') {
                this.setting = Object.assign({}, {
                    tipTxt: tipTxtOrOption,
                    duration,
                    isMask
                });
            } else {
                this.setting = Object.assign({}, {
                    tipTxt: '',
                    ..._default
                }, tipTxtOrOption);
            }
            this.instance.tipTxt = this.setting.tipTxt;
            this.instance.isMask = this.setting.isMask;

            this.resolveFn = resolve;
            toastQueue.map((item, index) => {
                item.hide(index);
            });

            this.instance.isShow = true;
            toastQueue.push(this);
            setTimeout(() => {
                this.hide();
            }, this.setting.duration);
        });
    }

    hide (index = 0) {
        if (!this.instance.isShow) {
            return false;
        }
        this.instance.isShow = false;
        toastQueue.splice(index, 1);
        setTimeout(() => {
            this.resolveFn && this.resolveFn();
        }, 300); // 300ms取至.fade动画执行时间
    }
}

let el = new ShowToastClass();
export default {
    install (Vue) {
        /**
         * @param {string} tipTxtOrOption 要展示的文字或者配置项
         * @param {number} duration 展示时间
         * @param {boolean} isMask 是否带遮罩层阻止用户点击页面其他地方
         * 当第一个参数是JSON时，配置项是各个参数
         * @return {promise} 消失后resolve
         */
        Vue.prototype.$showToast = function (tipTxtOrOption = '', duration = _default.duration, isMask = _default.isMask) {
            return el.show(tipTxtOrOption, duration, isMask);
        };

        // 移除页面上所有的toast弹窗
        Vue.prototype.$clearToast = function () {
            toastQueue.map((item, index) => {
                item.hide(index);
            });
        };
    }
};
