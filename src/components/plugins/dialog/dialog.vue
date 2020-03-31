<template>
    <transition name="fade">
        <div class="dialog-com" v-if="isShow">
            <div class="mask"></div>
            <div class="dialog">
                <div class="dialog-header" v-show="title" v-html="title"></div>
                <div class="dialog-body">
                    <slot>
                        <div v-html="content"></div>
                    </slot>
                </div>
                <div class="dialog-buttons">
                    <button type="button" class="dialog-button cancel" v-if="isNeedCancelBtn " @click="cancel">取消</button>
                    <button type="button" class="dialog-button sure" @click="sure">确定</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import popupMixin from '../../utils/popupMixin.js';
export default {
    name: 'yDialog',
    mixins: [popupMixin],
    props: {
        isNeedCancelBtn: Boolean, // 是否需要展示取消按钮
        // 标题
        title: {
            type: String,
            default: '提示'
        },
        // 内容
        content: {
            type: String,
            default: ''
        }
    },
    methods: {
        // 点击了确定按钮
        sure () {
            this.$emit('sure');
            this.close();
        },
        // 点击了取消按钮
        cancel () {
            this.$emit('cancel');
            this.close();
        }
    }
};
</script>

<style lang="scss" scoped>
// @import '~assets/style/com.scss';
.dialog-com {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: $dialogZindex;
}

.fade-enter > .dialog {
    transform: scale(1.3);
}

.fade-leave-to > .dialog {
    transform: scale(0.8);
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.dialog {
    position: relative;
    width: 550px;
    color: #484746;
    border-radius: 8px;
    background-color: $white;

    // 动画
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
}
// 遮罩，一部分在com.scss里
.mask {
    background-color: rgba(0, 0, 0, 0.3);
}
// 头部
.dialog-header {
    padding: 20px;
    font-size: 30px;
    text-align: center;
    border-bottom: 1px solid #eee;
}
// 正文
.dialog-body {
    padding: 20px;
    text-align: center;
}
// 按钮组
.dialog-buttons {
    display: flex;
    padding: 20px;

    .dialog-button {
        flex: 1;
        min-height: 90px;
        font-size: 32px;
        border-width: 1px;
        border-style: solid;
        outline: none;
        text-align: center;
    }
    // 取消
    .cancel {
        margin-right: 20px;
        color: #444;
        border-color: #e5e5e5;
        background-color: $white;

        &:active {
            background-color: darken($white, 10%);
        }
    }
    // 确认
    .sure {
        color: $white;
        border-color: $meiBlue;
        background-color: $meiBlue;

        &:active {
            background-color: darken($meiBlue, 10%);
        }
    }
}

@keyframes g {
    0% {
        transform: scale(1.3);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes f {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(0.8);
        opacity: 0;
    }
}
</style>
