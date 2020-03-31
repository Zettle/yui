<template>
    <div v-if="isShowSync1" class="popup-warp">
        <transition name="fade">
            <div class="y-popup-com" v-if="isShowSync2">
                <div class="mask" @click="cancel"></div>
                <div class="y-popup">
                    <slot name="y-popup-header"></slot>
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            isShowSync1: false,
            isShowSync2: false
        };
    },
    watch: {
        isShow (newVal) {
            if (newVal) {
                // isShow = true的时候
                this.isShowSync1 = true;
                this.$nextTick(() => {
                    this.isShowSync2 = true;
                });
            } else {
                // isShow = false的时候
                this.isShowSync2 = false;
                setTimeout(() => {
                    this.isShowSync1 = false;
                }, 100); // 300ms是下滑动作的运动时间
            }
        }
    },
    methods: {
        say () {
            console.log('say');
        },
        cancel () {
            this.$emit('cancel');
        },
        sure () {
            this.$emit('sure');
        }
    }
};
</script>

<style lang="scss" scoped>
.y-popup-com {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: $popupZindex;
}

.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.y-popup {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: $white;
    transform: translateY(0);
    transition: transform 0.2s ease-out;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.fade-enter > .y-popup,
.fade-leave-to > .y-popup {
    transform: translateY(100%);
}

.fade-enter-to > .y-popup {
    transform: translateY(0);
}

// 头部样式
.y-popup-header {
    // height: 90px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
// 内容
.y-popup-body {
    position: relative;
    top: 0;
    left: 0;
}
</style>
