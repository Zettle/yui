<template>
    <app-layout>
        <y-button class="mt-20" @click.native="isShowDatePicker = true">年月日</y-button>

        <y-date-picker :isShow.sync="isShowDatePicker"></y-date-picker>
    </app-layout>
</template>

<script>
import yButton from '@/components/base/yButton';
export default {
    components: { yButton },
    data () {
        return {
            isShowDatePicker: true
        };
    }
};
</script>
