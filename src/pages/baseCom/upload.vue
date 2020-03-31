<template>
    <app-layout>
        <yUpload @change="changefile">
            <y-button>选择图片</y-button>
        </yUpload>

        <yUpload @change="changefile" @oversize="oversizeHandle" :maxSize="10 * 1024">
            <y-button class="mt-20">限制大小10KB</y-button>
        </yUpload>
    </app-layout>
</template>

<script>
import yUpload from '@/components/base/yUpload';
import yButton from '@/components/base/yButton';
export default {
    components: { yUpload, yButton },
    methods: {
        changefile (ev) {
            console.log('选择完回调', ev);
        },
        oversizeHandle (ev) {
            console.log('超过大小限制', ev);
        }
    }
};
</script>
