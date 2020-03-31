<template>
    <div class="radio-item" @click="clickItem">
        <i :class="iconClassNames"></i>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            require: true
        }
    },
    computed: {
        iconClassNames () {
            let isSelect = false;
            if (this.$parent.value === this.value) {
                isSelect = true;
            }
            return [isSelect ? 'iconfont-selected' : 'iconfont-unselected'];
        }
    },
    methods: {
        clickItem () {
            let obj = {
                [this.$parent.filedCodeName]: this.value
            };
            this.$parent.selectHandle(obj);
        }
    }
};
</script>
