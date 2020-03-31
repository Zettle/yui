<template>
    <div class="app-content" :class="{'has-header': hasHeader, 'has-footer': hasFooter}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        hasHeader: {
            type: Boolean,
            default: true
        },
        hasFooter: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.app-content {
    // position: absolute;
    // top: 0;
    // left: 0;
    // bottom: 0;
    width: 100%;
    height: 100%;
    padding-top: $appHeaderHeight;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;

    &.has-header {
        padding-top: $appHeaderHeight;
    }

    &.has-footer {
        padding-bottom: $appHeaderHeight;
    }
}
</style>
