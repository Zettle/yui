import Vue from 'vue';
import pickerCom from './picker';

/**
 * 由于考虑同个页面也会有多个picker，所以不能使用单例模式
 * 不然很难控制每个picker选择后再出现还是上次选择的状态（需要保存下归属哪个picker和消失时候的数据状态）
 */
class PickerClass {
    constructor (options) {
        this.PickerConstruction = Vue.extend(pickerCom);
        this.vm = new this.PickerConstruction().$mount(document.createElement('div'));
        for (let key in options) {
            if (key.indexOf('on') === 0) { // 含有on开头的说明是事件监听，去掉on后并首字母转为小写
                let eventName = key.substring(2, 3).toLowerCase() + key.substring(3);
                this.vm.$on(eventName, options[key]); // 加上监听
            } else {
                this.vm[key] = options[key];
            }
        }

        this.vm
            // .$on('cancel', () => {
            //     console.log('cancel');
            // })
            // .$on('sure', () => {
            //     console.log('sure');
            // })
            .$on('update:isShow', (newVal) => {
                this.vm.isShow = newVal;
                setTimeout(() => {
                    this.vm.$el.parentNode.removeChild(this.vm.$el);
                }, 100);
            });
    }
    show () {
        document.body.appendChild(this.vm.$el);
        this.vm.isShow = true;
    }
}

export default PickerClass;
