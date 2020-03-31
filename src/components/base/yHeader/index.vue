<template>
    <header class="app-header">
        <div class="header-left" v-if="isShowLeft" @click="goBack">
            <i class="iconfont-return"></i>
        </div>
        <div class="header-center">{{appTitle}}</div>
        <!-- 右边就不要加点击事件了，无法确定外面是不是多个图标，这样就有多个点击事件 -->
        <div class="header-right">
            <slot name="right"></slot>
        </div>
    </header>
</template>
<script>
export default {
    props: {
        isShowLeft: { // 是否显示左边的返回箭头
            type: Boolean,
            default: true
        },
        title: { // 要展示在头部的标题
            type: String,
            default: ''
        },
        backFun: { // 点击左上角的处理回调，这里不用$emit去监听是为了方便判断如果有值就不执行$go
            type: Function
        }
    },
    data () {
        return {
            appTitle: ''
        };
    },
    created () {
        this._initTitle(); // 初始换导航的标题
    },
    methods: {
        /**
         * 初始换导航的标题：如果没有传进来的，就按照路由配置中的来
         **/
        _initTitle () {
            this.appTitle = this.title || (this.$route && this.$route.meta && this.$route.meta.title);
        },
        // 点击左上角的处理回调
        goBack () {
            if (this.backFun) {
                this.backFun();
            } else {
                this.$router.$go();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.app-header {
    // position: relative;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: $headerZindex;
    height: $appHeaderHeight;
    line-height: $appHeaderHeight;
    background-color: $white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    // 左边的返回箭头
    .header-left {
        position: absolute;
        top: 0;
        left: 0;
        width: $appHeaderHeight;
        height: $appHeaderHeight;
        font-size: 32px;
        padding-left: 20px;
        // 点击反馈
        &:active {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
    // 中间的标题文本
    .header-center {
        line-height: $appHeaderHeight;
        text-align: center;
        font-size: 32px;
    }
    // 右边的提示内容，部分页面有
    .header-right {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 28px;
        box-sizing: border-box;
    }
}
</style>
