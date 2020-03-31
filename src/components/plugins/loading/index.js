import Vue from 'vue';
import loadingCom from './loading';
import mergeOptions from '../../utils/mergeOptions';

class LoadingClass {
    constructor () {
        const Loading = Vue.extend(loadingCom);
        this.vm = new Loading().$mount(document.createElement('div'));
        this.timer = null; // 延迟setTimeout对象
        document.body.appendChild(this.vm.$el);
    }
    /**
     * @param {string} tipTxt 展示的文字，默认空
     * @param {number} duration 要展示的延迟时间，几秒后消失
     */
    show (tipTxt = '', duration) {
        // 由于单例模式，第一次show里面有title属性，第二次show自带有原来的title，所以这里要重置下单例的各个属性
        mergeOptions(this.vm, {
            tipTxt,
            duration
        });
        if (!this.vm.isShow) {
            this.vm.isShow = true;
        }
        if (this.vm.duration) {
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.hide();
            }, duration);
        }
    }

    hide () {
        this.vm.isShow = false;
        // setTimeout(() => {
        //     this.vm.$el.parentNode && this.vm.$el.parentNode.removeChild(this.vm.$el);
        // }, 300); // 这里的300ms是取css中.fade的运行时间
    }
}

let loadingIntance = new LoadingClass();

export default {
    install (Vue) {
        // 挂载在vue原型上
        Vue.prototype.$showLoading = (tipTxt, duration) => {
            loadingIntance.show(tipTxt, duration);
        };

        Vue.prototype.$hideLoading = () => {
            loadingIntance.hide();
        };
    }
};
