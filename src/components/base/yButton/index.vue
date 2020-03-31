<template>
    <button :type="actionType" :class="className" :disabled="disabled" @click="clickHandle">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default',
            validator (val) {
                return ['default', 'warn'].includes(val);
            }
        },
        actionType: {
            type: String,
            default: 'button'
        },
        size: {
            type: String,
            default: 'block'
        },
        disabled: Boolean,
        half: Boolean, // 半圆脚
        full: Boolean, // 直角
        plain: Boolean // 镂空
    },
    computed: {
        className () {
            return [
                'btn',
                `btn-${this.type}`,
                `btn-${this.size}`,
                {
                    'btn-plain': this.plain,
                    'btn-full': this.full,
                    'btn-half': this.half
                }
            ];
        }
    },
    methods: {
        clickHandle () {
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss" scoped>
// 定义一个mixins，按钮被点击时候变暗10%
@mixin btn-active-style ($color) {
    background-color: $color;
    // 激活样式
    &:active {
        background-color: darken($color, 10%);
    }
    // 禁止样式，权重最大
    &[disabled] {
        background-color: lighten($color, 20%);
    }

    // 镂空样式
    &.btn-plain {
        color: $color;
        border-color: $color;
        background: $white;

        &:active { // 镂空的激活样式
            background-color: darken($white, 5%);
        }

        &[disabled] { // 镂空的禁止样式
            color: lighten($color, 20%);
            border-color: lighten($color, 20%);
            background-color: #f7f7f7;
        }
    }
}

.btn {
    display: block;
    width: 100%;
    color: $white;
    min-height: 88px;
    font-size: 32px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 8px;
    outline: none;
    // 直角
    &.btn-full {
        border-radius: 0;
    }
    // 半圆角
    &.btn-half {
        border-radius: 88px;
    }
}

// 大小
.btn-lg {
    width: 660px;
}

.btn-md {
    width: 460px;
}

.btn-sm {
    width: 260px;
}

.btn-xs { // 比如发送短信验证码的按钮
    width: 140px;
    min-height: 50px;
}

/**
 *颜色
 */
// ---默认，蓝
.btn-default {
    @include btn-active-style($meiBlue);
}

// ---红色
.btn-warn {
    color: $white;

    @include btn-active-style($assertive);
}
</style>
