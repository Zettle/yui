import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ajax from './js/ajax';

import yHeader from './components/base/yHeader';
import yContent from './components/base/yContent';
import appLayout from './components/busin/appLayout';

import loading from './components/plugins/loading';
import toast from './components/plugins/toast';
import dialog from './components/plugins/dialog';

// import 'lib-flexible/flexible'; // 淘宝高清方案
let docEl = window.document.documentElement;
function setFontSize () {
    let w = docEl.getBoundingClientRect().width; // 以540为最大值
    docEl.style.fontSize = `${(w > 540 ? 540 : w) / 10}px`;
}
setFontSize();
window.onresize = setFontSize;
// Promise Catch不报错
window.addEventListener('unhandledrejection', event => event.preventDefault());

Vue.component('yHeader', yHeader);
Vue.component('yContent', yContent);
Vue.component('appLayout', appLayout);

Vue.use(loading);
Vue.use(toast);
Vue.use(dialog);

Vue.config.productionTip = false;

// 这里必须加bind，不然ajax里面获取到的是vue组件
Vue.prototype.$post = ajax.post.bind(ajax);
Vue.prototype.$get = ajax.get.bind(ajax);
Vue.prototype.$postFormData = ajax.postFormData.bind(ajax);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
