<template>
    <app-layout>
        <y-button @click.native="isShowModal = true">出现modal</y-button>
        <y-button class="mt-20" @click.native="apiShowModal">api调用-复杂内容</y-button>

        <!-- 组件式的调用 -->
        <y-modal :isShow.sync="isShowModal" title="弹窗哈哈" @cancel="cancelHandle">
            <y-button class="mt-20" size="md" @click.native="apiShowModal">再出一层modal</y-button>
            <h1 v-for="i in 20" :key="i">sdjk={{i}}</h1>
        </y-modal>
    </app-layout>
</template>

<script>
import yButton from '@/components/base/yButton';
import yModal from '@/components/plugins/modal/modal';
import ModalApi from '@/components/plugins/modal';
import modalChild from './modal-child';
export default {
    components: { yButton, yModal },
    data () {
        return {
            isShowModal: false
        };
    },
    methods: {
        // 组件关闭监听
        cancelHandle () {
            console.log('组件modal关闭');
        },
        apiShowModal () {
            console.log(333);
            // 传入某个vue组件，展示该组件
            new ModalApi().show(modalChild, {
                title: 'modal子页面',
                onSubmit (data, data2) {
                    console.log('modal页面data1', data);
                    console.log('modal页面data2', data2);
                    console.log('modal页面-this指向', this); // this执行new ModalApi这个实例
                    this.remove();
                }
            });
        }
    }
};
</script>
