<template>
    <app-layout>
        <h3 class="mt-30">下拉加载上拉刷新</h3>
        <div class="box">
            <y-scroll @refresh="refreshHandle" @infinite="infiniteHandle">
                <h1 v-for="n of num" :key="n">{{n}}</h1>
            </y-scroll>
        </div>

        <!-- <h3 class="mt-30">局部滚动</h3>
        <div class="box-2">
            <y-scroll :isShowLayer="false">
                <h1 v-for="n of num" :key="n">{{n}}</h1>
            </y-scroll>
        </div> -->
    </app-layout>
</template>

<script>
import yScroll from '@/components/base/yScroll';
export default {
    components: { yScroll },
    data () {
        return {
            num: 20
        };
    },
    methods: {
        refreshHandle (done) {
            setTimeout(() => {
                console.log('===ajax请求完成===');
                this.num = 20;
                done();
            }, 2000);
        },
        infiniteHandle (done, noMoreData) {
            if (this.num <= 30) {
                setTimeout(() => {
                    this.num += 10;
                    if (this.num <= 30) {
                        done();
                    } else {
                        noMoreData();
                    }
                }, 2000);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.box,
.box-2 {
    width: 100%;
    height: 40%;
}
</style>
