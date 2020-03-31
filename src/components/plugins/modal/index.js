import Vue from 'vue';
import modalCom from './modal.vue';
// 由于一个页面可能有多个modal，所以这里不能像其他一样使用单例模式
class Modal {
    constructor (com, options) {
        this.vm = null;
        this.eventsHandle = {}; // 存放监听事件
        return this; // 便于链式操作
    }
    show (com, options) {
        const ModalConstructor = Vue.extend(modalCom);
        this.vm = new ModalConstructor().$mount();
        for (let key in options) {
            if (key.substring(0, 2) !== 'on') {
                this.vm[key] = options[key];
            } else {
                let keyName = `${key.substring(2, 3).toLowerCase()}${key.substring(3, key.length)}`;
                this.eventsHandle[keyName] = options[key];
            }
        }
        // this.vm = new ModalConstructor().$mount(document.createElement('div'));
        document.body.appendChild(this.vm.$el);

        this.vm
            .$off()
            .$once('update:isShow', newVal => {
                this.vm.isShow = newVal;
                if (newVal === false) {
                    setTimeout(() => {
                        this.vm.$el.parentNode && this.vm.$el.parentNode.removeChild(this.vm.$el);
                    }, 300);
                }
            });
        this.vm.isShow = true;
        Vue.nextTick(() => { // 一定要加这个，等待modal组件渲染到DOM里面，才可以query到#modal
            let ContentComponent = Vue.extend(com);
            let contentVm = new ContentComponent().$mount(this.vm.$refs['modal-content']);
            contentVm.$off();
            for (let eventName in this.eventsHandle) {
                contentVm.$on(eventName, (...data) => {
                    this.eventsHandle[eventName].apply(this, data); // 外面事件监听里面的this指向的是这个class Modal实例
                });
            }
        });
        return this; // 便于链式操作
    }
    // 移除modal
    remove () {
        this.vm.cancel();
        return this; // 便于链式操作
    }
}

export default Modal;
