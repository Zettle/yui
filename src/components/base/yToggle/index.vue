<template>
    <div :class="['y-toggle-com', { active: value }]" @click="toggle">
        <div class="handle"></div>
    </div>
</template>
<script>
// 该组件一开始是用v-model来实现，后面由于考虑到业务场景：用户点击关闭，请求后台成功后，才真正帮用户做关闭动作，所以又改为由外层去控制开关
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggle () {
            this.$emit('input', !this.value);
        }
    }
};
</script>
<style lang="scss" scoped>
$width: 102px;
$height: 64px;
$ballWidth: 54px;

.y-toggle-com {
    position: relative;
    top: 0;
    left: 0;
    width: $width;
    height: $height;
    border-width: 4px;
    border-style: solid;
    border-radius: $height;
    border-color: $lighGray;
    transition: all 0.3s ease-in-out;

    .handle {
        position: absolute;
        top: 0;
        left: 0;
        width: $ballWidth;
        height: $ballWidth;
        border-radius: 50%;
        background-color: $white;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35), 0 1px 1px rgba(0, 0, 0, 0.15);
        transition: all 0.3s cubic-bezier(0, 1.1, 1, 1.1);
    }
    // 打开状态，原理：利用transition，激活时候改变颜色和位置
    &.active {
        background-color: $meiBlue;
        border-color: $meiBlue;

        .handle {
            transform: translate3d($width - $ballWidth - 8px, 0, 0);
        }
    }
}
</style>
