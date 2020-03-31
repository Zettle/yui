<template>
    <transition name="fade">
        <div class="toast-com" v-if="isShow">
            <div class="mask" v-if="isMask"></div>
            <div class="toast" v-show="tipTxt">{{tipTxt}}</div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            tipTxt: 'String', // 文字提示
            isShow: false, // 是否展示toast
            isMask: false // 是否带有遮罩层
        };
    },
    destroyed () {
        console.log('destroyed');
    }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/com.scss';

$textFontSize: 28px; // toast-text的字体大小
$zIndex: 1000; // 基准z-index

// 最外层同时作为遮罩阻住用户点击页面其他地方
.toast {
    @include translucent;
}

.toast-text {
    font-size: $textFontSize;
}
</style>
