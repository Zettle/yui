<template>
    <app-layout>
        <y-button @click.native="isShow = true">侧边栏出现</y-button>

        <y-button class="mt-20" @click.native="showModalApi">在modal再出现modal要在modal页面看</y-button>

        <y-button class="mt-20" @click.native="closeModal">api关闭modal要在modal页面看</y-button>

        <y-side-bar :isShow.sync="isShow">
            <section class="container">
                <y-button @click.native="showLoading">loading</y-button>
                <y-button class="mt-20" @click.native="showDialog">对话框</y-button>
            </section>
        </y-side-bar>
    </app-layout>
</template>

<script>
import yButton from '@/components/base/yButton';
import ySideBar from '@/components/base/ySideBar';
import ModalApi from '@/components/plugins/modal';
import choicePage from './choice';
export default {
    components: { yButton, ySideBar },
    data () {
        return {
            isShow: false
        };
    },
    methods: {
        showLoading () {
            this.$showLoading('加载中', 1000);
        },
        showDialog () {
            this.$confirm({
                title: '标题',
                content: `<h1>233</h1>`
            }).then(isSure => {
                if (isSure) {
                    this.$showLoading('加载中', 1000);
                }
            });
        },
        showModalApi () {
            this.modal = new ModalApi();
            console.log(this.modal);
            this.modal.show(choicePage, {
                title: '选择标题'
            });
        },
        closeModal () {
            if (this.modal) {
                this.modal.remove();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;
}
</style>
