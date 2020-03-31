<template>
    <app-layout>
        <div class="mr-20 ml-20">
            <h3 class="mt-20">确定框</h3>
            <y-button class="mt-20" @click.native="showDialog">对话框组件，内容支持slot和html</y-button>
            <y-button class="mt-20" @click.native="showDialogApi">对话框api-alert</y-button>
            <y-button class="mt-20" @click.native="alert4">对话框api-连续alert</y-button>

            <h3 class="mt-20">咨询框</h3>
            <y-button class="mt-20" @click.native="isShow2 = true">咨询框-组件写法</y-button>
            <y-button class="mt-20" @click.native="showConfirm">咨询框-api调用</y-button>
            <y-button class="mt-20" @click.native="showConfirm2">咨询框-api调用</y-button>

            <!-- 对话框 -->
            <y-dialog :isShow.sync="isShow" :content="content" @sure="sureHandle" @cancel="cancelHandle"></y-dialog>
            <!-- 咨询框 -->
            <y-dialog :isShow.sync="isShow2" :content="content" :isNeedCancelBtn="true" @sure="sureHandle" @cancel="cancelHandle"></y-dialog>
        </div>
    </app-layout>
</template>

<script>
import yButton from '@/components/base/yButton';
import yDialog from '@/components/plugins/dialog/dialog';
let timer = null;
export default {
    components: { yButton, yDialog },
    data () {
        return {
            iCount: 0,
            isShow: false,
            isShow2: false, // 是否展示咨询框
            content: '<h1>223</h1>'
        };
    },
    beforeDestroy () {
        console.log('beforedestroy');
    },
    destroyed () {
        console.log('destroyed');
        clearInterval(this.timer);
    },
    methods: {
        showDialog () {
            // this.isShow = true;
            this.timer = setInterval(() => {
                console.log('我是定时器');
            }, 500);
        },
        // api调用出现弹窗
        showDialogApi () {
            // 复杂的场景用JSON的形式去配置
            // this.$confirm({
            //     title: '标题',
            //     content: `<h1>233</h1>`
            // }).then(res => {
            //     console.log(res);
            // });

            // 也可以单独传递一个字符串进去
            this.$alert(`<h1>23</h1>`).then(() => {
                console.log('弹窗关闭-promise回调');
                this.$router.$push('/baseCom/dialog');
            });
        },
        alert4 () {
            this.iCount = 0;
            timer && clearInterval(timer);
            timer = setInterval(() => {
                this.iCount++;
                if (this.iCount > 4) {
                    timer && clearInterval(timer);
                } else {
                    this.$alert(`<h1>${this.iCount}</h1>`);
                }
            }, 1000);
        },
        // api调用出现咨询弹窗
        showConfirm () {
            this.$confirm({
                title: '标题1',
                content: '内容1'
            }).then(isSure => {
                if (isSure) {
                    console.log('页面跳转');
                    this.$router.$push('/baseCom/actionsheet');
                }
            });
        },
        showConfirm2 () {
            this.$confirm({
                content: '内容2'
            }).then(isSure => {
                if (isSure) {
                    console.log('页面跳转');
                    this.$router.$push('/baseCom/actionsheet');
                }
            });
        },
        sureHandle () {
            console.log('sure');
        },
        cancelHandle () {
            console.log('cancel');
        }
    }
};
</script>
