<template>
    <div class="y-check-item" @click="selectHandle">
        <i :class="iconClassName"></i>
        <slot></slot>
    </div>
</template>

<script>
export default {
    created () {
        let childs = this.$parent.$children;
        if (childs.length > 0) {
            childs.map((item, index) => {
                item.$index = index;
            });
        }
    },
    computed: {
        iconClassName () {
            let isSelcted = false;
            if (this.$parent.vals.indexOf(this.$index) > -1) {
                isSelcted = true;
            }
            return [isSelcted ? 'iconfont-selected' : 'iconfont-unselected'];
        }
    },
    methods: {
        selectHandle () {
            this.$parent.selectHandle(this.$index);
        }
    }
};
</script>
