<template>
    <transition name="slide-down">
        <div class="modal-com" v-if="isShow">
            <y-header :title="title" :isShowLeft="false">
                <div slot="right" class="close-btn" @click="cancel">
                    <i class="iconfont-close" ></i>
                </div>
            </y-header>
            <div class="modal">
                <div ref="modal-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import yHeader from '../../base/yHeader';
import popupMixin from '../../utils/popupMixin';
export default {
    name: 'yModal',
    mixins: [popupMixin],
    components: { yHeader },
    props: {
        title: String
    },
    methods: {
        cancel () {
            this.$emit('cancel');
            this.close();
        }
    }
};
</script>

<style lang="scss" scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: transform 0.3s ease-in-out;
}

.slide-down-enter,
.slide-down-leave-active {
    transform: translateY(100%);
}

.modal-com {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: $modalZindex;
    background-color: $white;
}
// 顶部关闭按钮
.close-btn {
    width: $appHeaderHeight;
    text-align: center;

    &:active {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .icon-close {
        font-weight: bold;
    }
}

.modal {
    position: absolute;
    top: $appHeaderHeight;
    bottom: 0;
    right: 0;
    left: 0;
    // padding-top: $appHeaderHeight;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
</style>
