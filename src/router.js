import Vue from 'vue';
import pool from '@/js/pool';
import VueRouter from 'vue-router';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('@/pages/home'),
            meta: { title: '首页' }
        }, {
            path: '/baseCom',
            component: { template: '<router-view></router-view>' },
            children: [
                {
                    path: 'icon',
                    component: () => import('@/pages/baseCom/icon'),
                    meta: { title: '图标' }
                }, {
                    path: 'button',
                    component: () => import('@/pages/baseCom/button'),
                    meta: { title: '按钮' }
                }, {
                    path: 'picker',
                    component: () => import('@/pages/baseCom/picker'),
                    meta: { title: '下拉选择框' }
                }, {
                    path: 'range',
                    component: () => import('@/pages/baseCom/range'),
                    meta: { title: '滑动选择' }
                }, {
                    path: 'choice',
                    component: () => import('@/pages/baseCom/choice'),
                    meta: { title: '选择' }
                }, {
                    path: 'loadingToast',
                    component: () => import('@/pages/baseCom/loadingToast'),
                    meta: { title: 'loading+toast' }
                }, {
                    path: 'dialog',
                    component: () => import('@/pages/baseCom/dialog'),
                    meta: { title: 'dialog' }
                }, {
                    path: 'actionsheet',
                    component: () => import('@/pages/baseCom/actionsheet'),
                    meta: { title: 'actionsheet' }
                }, {
                    path: 'sidebar',
                    component: () => import('@/pages/baseCom/sidebar'),
                    meta: { title: 'sidebar' }
                }, {
                    path: 'modal',
                    component: () => import('@/pages/baseCom/modal'),
                    meta: { title: '模拟弹窗modal' }
                }, {
                    path: 'scroll',
                    component: () => import('@/pages/baseCom/scroll'),
                    meta: { title: '滚动scroll' }
                }, {
                    path: 'datepicker',
                    component: () => import('@/pages/baseCom/datepicker'),
                    meta: { title: '时间选择器' }
                }, {
                    path: 'upload',
                    component: () => import('@/pages/baseCom/upload'),
                    meta: { title: '上传' }
                }, {
                    path: 'ajax',
                    component: () => import('@/pages/baseCom/ajax'),
                    meta: { title: 'ajax+loading' }
                }
            ]
        }, {
            path: '/businCom',
            component: { template: '<router-view></router-view>' },
            children: [
            ]
        }
    ]
});

// 这种写法太依赖layerPlugins了，哪天改变了名称但没同步就惨了
// const layerPlugins = ['yDialog', 'yActionSheet'];
// router.beforeEach((to, from, next) => {
//     // 对浮层组件，用这种方式监听，如果按下返回键的时候，有浮层类组件出现则优先隐藏浮层组件
//     (function () {
//         for (let pluginName of Object.values(layerPlugins)) {
//             if (pool.$yui[pluginName]) {
//                 pool.$yui[pluginName].removeFromDom(); // 关闭插件
//                 next(false);
//                 return false; // 一旦指定这里就不要在继续执行了
//             }
//         }
//         next();
//     })();
// });

router.beforeEach((to, from, next) => {
    /**
     * 前进的话，就不需要做任何判断，主要避免这种场景，看/baseCom/dialog页面的demo：
     * 场景如下
     * 出现一个咨询弹窗，用户点击确定后，去到新的页面
     * 如果没有下面的判断点击的那时候promise.resolve并要跳转页面了，这时候执行到了beforeEach
     * 但由于弹窗消失有个渐变动画，在beforeEach的时候弹窗还没有消失即 pool.$yui['yDialog'] 还有值在，就会阻止页面跳转
     * ======================
     * 隐患：项目中代码的前进后退可以用router.goTo区分，但是浏览器的前进后台区分不了，都会默认认为是浏览器后退
     * ======================
     * 改进：不放在这里判断了，如果在这里，那么前进的时候浮层不会消失，放在下面循环再去做，如果是前进，那么
     */
    // if (router.goTo) {
    //     next();
    //     return false;
    // }
    /**
     * ~~del 区分不了前进还是后退写组件的时候特别要注意一定要等pool.$yui[pluginName]没有了再去resolve，不然前进也会有问题~~
     * 前进和后退封装了$go、$push里面有标识this.goTo
     * 这样子项目中凡是前进的都要用$push或者$replace，不能再用vue-router自带的方法了
     * 对浮层组件和插件，用这种方式监听，如果按下返回键的时候，有浮层类组件出现则优先隐藏浮层组件
     */
    for (let pluginName of Object.values(pool.$yui)) {
        if (pluginName) {
            pluginName.removeFromDom(); // 关闭插件
            // 阻止页面跳转，如果说不需要实现那种回退的时候紧紧隐藏浮层组件，那么也不需要区分浏览器前进后退了
            next(router.goTo); // 本来这里是next(false)，改为这样就不用上面的if(router.goTo)判断了
            return false; // 一旦指定这里就不要在继续执行了
        }
    }
    next();
});
/*
 * 为了能够正确执行转场动画，跳转页面的方法需要做一层包装
 * 这里最好不用用箭头函数，里面的this找不到
 */
VueRouter.prototype.$go = function (delta = -1, noAnimate) {
    this.noAnimate = noAnimate || false;
    this.goTo = false; // 告诉页面动画这里是后退
    this.go(delta);
};
VueRouter.prototype.$push = function (location, noAnimate, onComplete, onAbort) {
    this.noAnimate = noAnimate || false;
    this.goTo = true; // 告诉页面动画这里是前进
    this.push(location, onComplete, onAbort);
};
VueRouter.prototype.$replace = function (location, noAnimate, onComplete, onAbort) {
    this.noAnimate = noAnimate || false;
    this.goTo = true; // 告诉页面动画这里是前进
    this.replace(location, onComplete, onAbort);
};

Vue.use(VueRouter); // 挂载在Vue原型上，方便通过this.去调用

export default router;
