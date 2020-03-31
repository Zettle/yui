<template>
    <app-layout>
        <div class="ml-20 mr-20">
            <h3>滑动-原生input实现{{curVal}}</h3>
            <y-input-range v-model="curVal"></y-input-range>
            <h3>滑动-原生input实现-max-min-step</h3>
            <p>min:{{min}}</p>
            <p>max:{{max}}</p>
            <p>curVal2:{{curVal2}}</p>
            <y-input-range :min="min" :max="max" :step="5" v-model="curVal2"></y-input-range>
            <h3>滑动-div模拟</h3>
            <y-slider></y-slider>
        </div>
    </app-layout>
</template>
<script>
import yInputRange from '@/components/base/yInputRange';
import ySlider from '@/components/base/ySlider';
export default {
    components: { yInputRange, ySlider },
    data () {
        return {
            min: 10,
            max: 20,
            curVal2: 10,
            curVal: 120 // range当前值
        };
    },
    created () {
        // setInterval(() => {
        //     this.curVal += 10;
        // }, 1000);
    }
};
</script>
<style lang="scss" scoped>
h3 {
    padding: 10px;
    font-size: 30px;
    color: #fff;
    background-color: #35495e;
}
</style>
