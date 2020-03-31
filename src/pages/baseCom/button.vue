<template>
    <app-layout>
        <h3 class="mt-30">颜色</h3>
        <y-button>蓝-默认</y-button>
        <y-button class="mt-20" type="warn">红</y-button>

        <h3 class="mt-30">镂空</h3>
        <y-button plain>蓝</y-button>
        <y-button class="mt-20" type="warn" plain>红</y-button>

        <h3 class="mt-30">禁止点击</h3>
        <y-button :disabled="true">蓝</y-button>
        <y-button class="mt-20" type="warn" :disabled="true">红</y-button>
        <y-button class="mt-20" plain :disabled="true">蓝</y-button>
        <y-button class="mt-20" type="warn" plain :disabled="true">红</y-button>

        <h3 class="mt-30">圆角/半圆/直角</h3>
        <y-button class="mt-20">圆角-默认</y-button>
        <y-button class="mt-20" half>半圆</y-button>
        <y-button class="mt-20" full>直角</y-button>

        <h3 class="mt-30">大小</h3>
        <y-button class="mt-20">默认-100%</y-button>
        <y-button class="mt-20" size="lg">lg-660px</y-button>
        <y-button class="mt-20" size="md">md-460px</y-button>
        <y-button class="mt-20" size="sm">sm-260px</y-button>
        <y-button class="mt-20" size="xs">xs-140px</y-button>
    </app-layout>
</template>

<script>
import yButton from '@/components/base/yButton';
export default {
    components: { yButton }
};
</script>
