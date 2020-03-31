<template>
    <app-layout>
        <h1 class="mt-40">每个元素是JSON-组件式调用-vmodel</h1>
        <div>
            <y-button @click="isShowPicker = true">出现下拉框{{iCurPickerIndex}}</y-button>
            <y-picker :isShow.sync="isShowPicker" :list="pickerData" v-model="iCurPickerIndex" filedLabelName="city" @cancel="cancelPicker" @sure="surePicker"></y-picker>
        </div>

        <h1 class="mt-40">每个元素是JSON-组件式调用-emit+value</h1>
        <div>
            <y-button @click="isShowPicker2 = true">出现下拉框{{iCurPickerIndex2}}</y-button>
            <y-picker :isShow.sync="isShowPicker2" :list="pickerData" :value="iCurPickerIndex2" filedLabelName="city" @cancel="cancelPicker2" @sure="surePicker2"></y-picker>
        </div>

        <h1 class="mt-40">每个元素是String-api调用</h1>
        <y-button @click="showPickerApi1">出现下拉框</y-button>

        <!-- <h1 class="mt-30">单选下拉框-每个元素是字符串-api调用-默认第二个</h1>
        <y-button class="mt-10" @click="showPickerApi3">出现下拉框{{iCurPickerIndex3}}</y-button> -->

        <!-- <h1 class="mt-30">多列下拉框-api调用</h1>
        <y-button class="mt-10" @click="showPickerApiMulti">出现下拉框</y-button> -->
    </app-layout>
</template>

<script>
import yPicker from '@/components/plugins/picker/picker';
import yButton from '@/components/base/yButton';
import PikcerApi from '@/components/plugins/picker';

export default {
    // components: { yButton, yPicker },
    components: { yButton, yPicker },
    data () {
        return {
            isShowPicker: false, // 是否展示下拉框
            iCurPickerIndex: '', // 下拉框选中的下标
            isShowPicker2: false,
            iCurPickerIndex2: 1,
            pickerData: [ // 下拉框的选择项内容
                { city: '这是AAA选项', id: 'yg001' },
                { city: '这是BBB选项', id: 'yg002' },
                { city: '这是EEE选项', id: 'yg003' }
            ]
        };
    },
    methods: {
        // 调用api出现下拉框
        showPicker () {
            console.log(33);
        },
        // 选择完下拉框选择项后
        surePicker (index) {
            console.log('选择了第几个：', index);
        },
        // 选择完下拉框选择项后
        cancelPicker () {
            console.log('取消了picker选择项');
        },
        cancelPicker2 () {
            console.log('取消了picker选择项');
        },
        surePicker2 (index) {
            console.log('选择了第几个：', index);
            this.iCurPickerIndex2 = index;
        },
        // api调用，出现下拉选择框
        showPickerApi1 () {
            if (!this.pkIntance1) {
                this.pkIntance1 = new PikcerApi({
                    list: ['文案1', '文案2', '文案3'],
                    value: 1,
                    onSure: (tapIndex) => { // 要用箭头函数，this才会执行页面组件，否则指向的是this.pkIntance1
                        console.log('点击了', tapIndex, this.pickerData);
                    },
                    onCancel: () => {
                        console.log('关闭了');
                    }
                });
            }
            this.pkIntance1.show();
        }
    }
};
</script>

<style lang="scss" scoped>
h1 {
    margin-top: 40px;
    font-size: 32px;
    color: #fff;
    background-color: #35495e;
}
</style>
