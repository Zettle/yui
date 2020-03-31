<template>
    <input type="range" :value="val" :min="min" :max="max" :step="step" @change="onChange" />
</template>
<script>
export default {
    props: {
        // 当前值
        value: {
            type: Number,
            default: 0
        },
        // 最小值
        min: {
            type: Number,
            default: 0
        },
        // 最大值
        max: {
            type: Number,
            default: 100
        },
        // 增长幅度
        step: {
            type: Number,
            default: 1
        }
    },
    computed: {
        // 同步prop.value的值
        val () {
            return this.value;
        }
    },
    methods: {
        onChange (ev) {
            this.$emit('input', +ev.target.value); // 用+转为数字
        }
    }
};
</script>
<style lang="scss" scoped>
// 进度条的样式
input[type=range] {
    width: 100%;
    -webkit-appearance: none; // 清除系统默认样式
    background: linear-gradient(to right, #ccc 0%, #ccc 100%);
    background-position: center;
    background-size: 99% 4px;
    background-repeat: no-repeat;

    // 拖动块的样式
    &::-webkit-slider-thumb {
        -webkit-appearance: none; // 清除系统默认样式
        height: 56px; // 拖动块高度
        width: 56px; // 拖动块宽度
        border-radius: 50%;  // 外观设置为圆形
        background-color: #fff; // 拖动块背景
        border: solid 1px #ddd;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3), 0 6px 10px rgba(0, 0, 0, 0.2);
    }
}
</style>
