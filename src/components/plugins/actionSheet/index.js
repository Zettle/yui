import Vue from 'vue';
import actionSheetCom from './actionSheet';
import mergeOptions from '../../utils/mergeOptions';

class ActionSheet {
    constructor () {
        const ActionSheet = Vue.extend(actionSheetCom);
        this.vm = new ActionSheet().$mount(document.createElement('div'));
        document.body.appendChild(this.vm.$el);
    }
    show (options) {
        // 由于销毁了组件，之后每次都需要重新new个
        return new Promise((resolve, reject) => {
            // 由于单例模式，第一次show里面有title属性，第二次show自带有原来的title，所以这里要重置下单例的各个属性
            mergeOptions(this.vm, options);

            this.vm.isShow = true;
            this.vm
                .$off()
                .$once('choose', tapIndex => {
                    resolve(tapIndex);
                })
                .$once('cancel', newVal => {
                    reject(new Error('close'));
                })
                // 监听弹窗消失，由于plugin方式调用的不像组件可以直接用.snyc，所以这里要同步下数据
                .$once('update:isShow', val => {
                    if (val === false) {
                        this.vm.isShow = false;
                    }
                });
        });
    }
};

let actionSheetIntance = new ActionSheet();
export default {
    install (Vue) {
        Vue.prototype.$actionSheet = (options) => {
            return actionSheetIntance.show(options);
        };
    }
};
export const actionSheetModule = (options) => {
    return actionSheetIntance.show(options);
};
