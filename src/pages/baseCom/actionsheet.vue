<template>
    <app-layout>
        <y-button class="mt-20" @click.native="isShow1 = true">组件属性传递</y-button>
        <y-button class="mt-20" @click.native="isShow2 = true">复杂头部和内容-slot实现</y-button>
        <y-button class="mt-20" @click.native="showSheetApi2">api调用-挂载vue原型上</y-button>
        <y-button class="mt-20" @click.native="showSheetApi3">api调用-引入调用</y-button>

        <action-sheet :list="menuList" :isShow.sync="isShow1" title="标题1" @choose="chooseItemCom" @cancel="cancelAScom"></action-sheet>

        <action-sheet :isShow.sync="isShow2" @choose="chooseItemCom">
            <div slot="header">
                <div class="cut-sheet-header">
                    <span>惊</span>
                    <span>喜</span>
                    <span>万</span>
                    <span>分</span>
                </div>
            </div>
            <action-sheet-item v-for="(item, $index) of menuList" :key="item.code" :index="$index">
                {{item.text}}-{{item.code}}
            </action-sheet-item>
        </action-sheet>
    </app-layout>
</template>

<script>
import yButton from '@/components/base/yButton';
import actionSheet from '@/components/plugins/actionSheet/actionSheet';
import actionSheetItem from '@/components/plugins/actionSheet/actionSheetItem';
import { actionSheetModule } from '@/components/plugins/actionSheet';
export default {
    components: { yButton, actionSheet, actionSheetItem },
    data () {
        return {
            isShow1: false,
            isShow2: false,
            menuList: []
        };
    },
    created () {
        setTimeout(() => {
            console.log('模拟接口返回list结果');
            this.menuList = [
                { code: 'Y001', text: '选项1' },
                { code: 'Y002', text: '选项2' },
                { code: 'Y003', text: '选项3' }
            ];
        }, 2000);
    },
    methods: {
        showSheet () {
            console.log('showSheet');
        },
        // 组件actionsheet选择启动某个选项
        chooseItemCom (index) {
            console.log(index);
        },
        // 组件取消actionsheet
        cancelAScom () {
            console.log('组件actionSheet关闭');
        },
        showSheetApi2 () {
            this.$actionSheet({
                title: '我是文本可以html丫丫',
                filedLabelName: 'name',
                list: [
                    { code: 'Y001', name: '选项1' },
                    { code: 'Y002', name: '选项2' },
                    { code: 'Y003', name: '选项3' }
                ]
            }).then(tapIndex => {
                console.log(tapIndex);
            }, () => {
                console.log('actionSheet关闭了');
            });
        },
        showSheetApi3 () {
            actionSheetModule({
                // title: '我是文本可以html',
                filedLabelName: 'name',
                list: [
                    { code: 'Y001', name: '选项1' },
                    { code: 'Y002', name: '选项2' },
                    { code: 'Y003', name: '选项3' }
                ]
            }).then(tapIndex => {
                console.log(tapIndex);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.cut-sheet-header {
    span {
        &:nth-child(1) {
            color: red;
        }

        &:nth-child(2) {
            color: blue;
        }

        &:nth-child(3) {
            color: green;
        }

        &:nth-child(4) {
            color: yellow;
        }
    }
}
</style>
