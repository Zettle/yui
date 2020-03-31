import Vue from 'vue';
import dialogCom from './dialog';
import mergeOptions from '../../utils/mergeOptions';

class Dialog {
    constructor () {
        // 单例模式，一个页面只存在一个dialog
        if (!this.vm) {
            let Dialog = Vue.extend(dialogCom);
            // new Dialog会触发created钩子 加上$mount触发mounted钩子
            this.vm = new Dialog().$mount(document.createElement('div'));

            document.body.appendChild(this.vm.$el); // 添加到DOM上面
        }
    }
    /**
     * @param {JSON} setting 配置
     * --title {string} 标题
     * --content {string} 内容
     * @return {promise} 点击取消和确认返回false和true
     */
    show (options) {
        // 由于单例模式，第一次show里面有title属性，第二次show自带有原来的title，所以这里要重置下单例的各个属性
        mergeOptions(this.vm, options);

        return new Promise(resolve => {
            this.vm.isShow = true;
            this.vm
                .$off() // 取消所有监听
                // 监听点击确认按钮，组件内自己触发了close所以这里不需要再调用close
                .$once('sure', () => {
                    console.log('sure按钮-$on监听');
                    resolve(true);
                })
                // 监听点击取消按钮，组件内自己触发了close所以这里不需要再调用close
                .$once('cancel', () => {
                    console.log('cacenl按钮-$on监听');
                    resolve(false);
                })
                // 监听弹窗消失，由于plugin方式调用的不像组件可以直接用.snyc，所以这里要同步下数据
                .$once('update:isShow', val => {
                    if (val === false) {
                        this.vm.isShow = false;
                    }
                });
        });
    }
}

let diaLogIntance = new Dialog();

export default {
    install (Vue) {
        // 挂载在vue原型上
        Vue.prototype.$alert = (contentORoptions = '') => {
            // 如果只是一个字符串，就作为弹窗内容content
            if (typeof contentORoptions === 'string') {
                contentORoptions = {
                    content: contentORoptions
                };
            }
            let setting = Object.assign({}, contentORoptions, { isNeedCancelBtn: false });
            return diaLogIntance.show(setting);
        };

        // 如果是cuciui的写法
        // 这里不能用箭头函数，不然this指向的是export defalut这个对象
        // 用function谁调用指向谁
        // Vue.prototype.$confirm = function (contentORoptions = '') {
        Vue.prototype.$confirm = (contentORoptions = '') => {
            // // 如果只是一个字符串，就作为弹窗内容content
            if (typeof contentORoptions === 'string') {
                contentORoptions = {
                    content: contentORoptions
                };
            }
            let setting = Object.assign({}, contentORoptions, { isNeedCancelBtn: true });
            return diaLogIntance.show(setting);
        };
    }
};
