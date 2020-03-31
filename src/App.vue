<template>
    <transition :name="transitionName">
        <router-view class="child-view" />
    </transition>
</template>

<script>
export default {
    data () {
        return {
            transitionName: '' // 动画名称
        };
    },
    watch: {
        // 这里的监听会监听本身router-view已经里面所有子router-view
        $route (to, from) {
            let goTo = this.$router.goTo;
            if (goTo) {
                /** 前进的效果 **/
                this.transitionName = 'slide-right';
            } else {
                /** 后退的效果 **/
                this.transitionName = 'slide-left';
            }
            this.$router.goTo = false; // 这里需要设置为false，便于点击安卓返回键或者浏览器后退键的时候，有后退的效果
        }
    }
};
</script>

<style lang="scss">
@import '~assets/style/index.scss';

.child-view {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s;
}

.slide-left-enter,
.slide-right-leave-active {
    transform: translateX(-100%);
}

.slide-left-leave-active,
.slide-right-enter {
    transform: translateX(100%);
}
</style>
