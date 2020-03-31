<template>
    <transition name="fade">
        <div class="loading-com" v-if="isShow">
            <div class="loading">
                <div class="loading-icon-box">
                    <div class="loading-icon dotted"></div>
                </div>
                <div class="loading-text" v-show="tipTxt">{{tipTxt}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        tipTxt: String, // 文字提示
        isShow: Boolean // 是否展示loading
    },
    methods: {
        hide () {
            this.$emit('update:isShow', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/com.scss';
$iconSize: 64px; // loading-icon的大小
$textFontSize: 28px; // loading-text的字体大小
// 最外层同时作为遮罩阻住用户点击页面其他地方
.loading-com {
    // position: fixed;
    // top: 0;
    // left: 0;
    // bottom: 0;
    // right: 0;
    // z-index: $loadingZindex;
}

.loading {
    @include translucent;
}

.loading-icon-box {
    position: relative;
    top: 0;
    left: 0;
    height: $iconSize;
    margin-bottom: 25px;

    .loading-icon {
        // 实现脱离文档流并且水平居中
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -$iconSize /2;
        width: $iconSize;
        height: $iconSize;
        border-radius: 50%;
        animation: loading-rotate 1s infinite linear;
    }
}
// loading转圈圈的效果
@keyframes loading-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-icon.dotted {
    border: 6px dotted transparent;
    border-bottom-color: rgba(255, 255, 255, 1);
    border-right-color: rgba(255, 255, 255, 0.9);
}

.loading-text {
    width: 100%;
    text-align: center;
    font-size: $textFontSize;
}
</style>
