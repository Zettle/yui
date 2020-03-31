<template>
    <app-layout>
        <div class="ml-20 mr-20">
            <h3 class="mt-30">单选-简单的直接:list实现</h3>
            <p>v-model绑定的是数组元素的key</p>
            <div class="mt-10">
                <y-radio v-model="curGender" :list="genderList"></y-radio>
            </div>

            <h3 class="mt-30">单选-list方式的反显</h3>
            <div class="mt-10">
                <y-radio v-model="curGender2" :list="genderList"></y-radio>
            </div>

            <h3 class="mt-30">单选-复杂的用组件实现</h3>
            <div class="mt-10">
                <y-radio v-model="curGender3">
                    <y-radio-item v-for="item of genderList" :key="item.key" :value="item.key">
                        {{item.text}}-<span class="color-red">{{item.key}}</span>
                    </y-radio-item>
                </y-radio>
            </div>

            <h3 class="mt-30">单选-复杂反显</h3>
            <div class="mt-10">
                <y-radio v-model="curGender4">
                    <y-radio-item v-for="item of genderList" :key="item.key" :value="item.key">
                        {{item.text}}-<span class="color-red">{{item.key}}</span>
                    </y-radio-item>
                </y-radio>
            </div>

            <h3 class="mt-30">多选-简单的直接:list实现</h3>
            <p>设置最多选择2个，v-model绑定的是数组元素下标索引</p>
            <div class="mt-10">
                <y-checkbox v-model="curLessons" :max-len="2" :list="lessonList" @exceedMax="exceedMaxHandle"></y-checkbox>
            </div>

            <h3 class="mt-30">多选-复杂的组件实现</h3>
            <div class="mt-10">
                <y-checkbox v-model="curLessons2">
                    <y-checkbox-item v-for="item of lessonList" :key="item.key">
                        {{item.text}}-<span class="color-red">{{item.key}}</span>
                    </y-checkbox-item>
                </y-checkbox>
            </div>

            <h3 class="mt-30">开关</h3>
            <p>:value绑定，开关的那一刻要请求接口，成功后才真正开关</p>
            <y-toggle :value="isOpen" @input="toggleOpen"></y-toggle>
            <p>v-model绑定，开关的动作和后台没有关系</p>
            <y-toggle v-model="isOpen2"></y-toggle>
        </div>
    </app-layout>
</template>
<script>
import yRadio from '@/components/base/yRadio';
import yRadioItem from '@/components/base/yRadio/yRadioItem';
import yCheckbox from '@/components/base/yCheckbox';
import yCheckboxItem from '@/components/base/yCheckbox/yCheckboxItem';
import yToggle from '@/components/base/yToggle';
const genderList = [
    { key: 'g01', text: '男' },
    { key: 'g02', text: '女' }
];

const lessonList = [
    { key: 'yw', text: '语文' },
    { key: 'sx', text: '数学' },
    { key: 'yy', text: '英语' },
    { key: 'wl', text: '物理' }
];
export default {
    components: { yRadio, yRadioItem, yCheckbox, yToggle, yCheckboxItem },
    data () {
        return {
            curGender: '', // 选中的性别
            curGender2: '', // 选中的性别
            curGender3: '', // 选中的性别
            curGender4: '', // 选中的性别
            genderList, // 性别列表
            curLessons: [], // 选中的课程，索引
            curLessons2: [], // 选中的课程，索引
            lessonList, // 学科列表
            isOpen: false, // 开关是否打开
            isOpen2: true // 开关v-model绑定
        };
    },
    created () {
        setTimeout(() => {
            console.log('接口返回结果');
            this.curGender2 = 'g02';
            this.curGender4 = 'g01';
        }, 500);
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
        letters.forEach((item, index) => {
            this.pickerData.push({
                city: `这是选项${item}`,
                id: index
            });
        });
    },
    methods: {
        toggleOpen (val) {
            this.$showLoading();
            setTimeout(() => {
                this.$hideLoading();
                this.isOpen = val;
            }, 1000);
        },
        // 超过最大个数预警
        exceedMaxHandle () {
            this.$showToast('超过个数限制');
        }
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

.color-red {
    color: red;
}
</style>
