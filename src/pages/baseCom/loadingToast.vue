<template>
    <app-layout >
        <div class="ml-20 mr-20">
            <h3>Loading</h3>
            <y-button class="mt-20" @click.native="showLoading">loading组件</y-button>
            <y-button class="mt-20" @click.native="showLoadingApi">loading-调api-出现消失</y-button>
            <y-button class="mt-20" @click.native="loadingAutoHide">loading-调api-连续多次调用</y-button>
            <y-button class="mt-20" @click.native="showLoadingUpload">上传-调api-毫秒级调用</y-button>

            <h3>Toast</h3>
            <y-button class="mt-20" @click.native="showToast">showToast组件</y-button>
            <y-button class="mt-20" @click.native="showToastCon">连续toast提示</y-button>

        </div>
        <y-loading ref="loading" :isShow.sync="isShowLoading" tip-txt="加载中加载中水电费ssd"></y-loading>
    </app-layout >
</template>

<script>
import yButton from '@/components/base/yButton';
import yLoading from '@/components/plugins/loading/loading';
// let timer = null;
export default {
    components: { yButton, yLoading },
    data () {
        return {
            iCount: 0, // 计时器
            isShowLoading: false // 是否展示loading组件
        };
    },
    methods: {
        // 组件展示loading
        showLoading () {
            this.isShowLoading = !this.isShowLoading;
            setTimeout(() => {
                this.$refs['loading'].hide();
            }, 1000);
        },
        // api展示loading
        showLoadingApi () {
            let i = 0;
            this.$showLoading('我是我' + (++i));
            let timer = setInterval(() => {
                this.$showLoading('我是我' + (++i));
            }, 1000);

            setTimeout(() => {
                this.$hideLoading();
                clearInterval(timer);
            }, 4000);
        },
        // 4s后自动消失
        loadingAutoHide () {
            this.$showLoading('第1个loading');
            this.$showLoading('第2个loading');
            this.$showLoading('第3个loading');
        },

        // toast-api调用
        showToast () {
            this.$showToast('我是toast', 3000).then(() => {
                console.log('消失回调1');
            });
        },

        // 连续toast提示
        // toast-2s后会消失，加入在1s的时候又有toast提示
        // 正常应该文案都出现，并且应该回调2个resolve
        showToastCon () {
            // 第一个接口，返回
            this.$showToast('第一个toast提示', 2000).then(() => {
                console.log('第一个toast回调');
            });

            // 1s的时候又有toast提示
            setTimeout(() => {
                console.log('===开始调用第二个toast===');
                this.$showToast('第二个toast提示', 5000).then(() => {
                    console.log('第二个toast回调');
                });
            //     // setTimeout(() => {
            //     //     this.$clearToast();
            //     // }, 1000);
            }, 1000);
        },

        // 上传loading，毫秒级调用
        showLoadingUpload () {
            let iCount = 0;
            let timer1 = null;
            let timer2 = null;
            // 每1秒加1
            timer1 = setInterval(() => {
                iCount++;
                if (iCount === 4) {
                    clearInterval(timer1);
                    clearInterval(timer2);
                    this.$hideLoading();
                }
            }, 1000);
            // 毫秒级调用showLoading
            timer2 = setInterval(() => {
                this.$showLoading(`已上传${iCount}`);
            }, 100);
        }
    }
};
</script>
