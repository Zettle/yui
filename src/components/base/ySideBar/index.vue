<template>
    <transition name="slide-right">
        <div class="side-bar-com" v-if="isShow">
            <div class="mask" @click="close"></div>
            <div class="side-bar">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
import popupMixin from '../../utils/popupMixin';
export default {
    name: 'ySideBar',
    mixins: [popupMixin]
};
</script>

<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.3s;
    opacity: 1;
}

.slide-right-enter,
.slide-right-leave-active {
    transform: translateX(100%);
    opacity: 0.3;
}

.side-bar-com,
.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: $sideBarZindex;
}

.side-bar {
    position: absolute;
    right: 0;
    top: 0;
    z-index: $sideBarZindex + 2;
    width: 80%;
    height: 100%;
    background-color: $white;
    border-left: 1px solid #e5e5e5;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
}
</style>
