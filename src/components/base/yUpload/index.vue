<template>
    <div @click="clickHandle">
        <slot></slot>
        <input type="file" ref="file-input" class="hidden" :accept="accept" :capture="capture" @change="complete" />
    </div>
</template>

<script>
export default {
    props: {
        disabled: Boolean, // 是否禁止
        // input的accept属性
        accept: {
            type: String,
            default: 'image/*'
        },
        // input的capture属性
        capture: {
            type: String,
            default: 'camera'
        },
        // 限制文件最大多大，单位byte
        maxSize: {
            type: Number,
            default: Number.MAX_VALUE
        }
    },
    methods: {
        // 点击的是否触发隐藏的input[type=file]
        clickHandle () {
            this.$refs['file-input'].click();
        },
        // 选择完文件后的回调
        complete (ev) {
            let file = ev.target.files[0];
            if (file.size > this.maxSize) {
                this.$emit('oversize', ev);
            } else {
                this.$emit('change', ev);
            }
        }
    }
};
</script>
