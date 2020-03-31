<template>
    <y-popup :isShow="isShow" @cancel="cancel">
        <div slot="y-popup-header" class="flex justify-content">
            <button type="button" class="y-picker-header-btn cancel" @click="cancel">取消</button>
            <button type="button" class="y-picker-header-btn sure" @click="sure">确定</button>
        </div>
        <div class="y-picker flex">
            <y-picker-column v-for="(item, $index) of pickerList" :key="$index"
                :ref="'pickerColumn-' + $index"
                :list="item"
                :filedLabelName="filedLabelName"
                :value="pickerValue[$index] ? pickerValue[$index] : ''">
            </y-picker-column>
            <!-- <y-picker-column v-for="(item, $index) of pickerList" :key="$index"
                :list="item"
                :filedLabelName="filedLabelName"
                :value="pickerValue[$index] ? pickerValue[$index] : ''"
                @change="chagneColumn($index, $event)"></y-picker-column> -->
            <div class="y-picker-hairline"></div>
        </div>
    </y-popup>
</template>

<script>
import yPopup from '../../base/yPopup';
import yPickerColumn from './pickerColumn';
import popupMixin from '../../utils/popupMixin.js';
export default {
    name: 'yPicker',
    mixins: [popupMixin],
    components: { yPopup, yPickerColumn },
    props: {
        // 是否展示下拉选择器，组件调用的话，父组件记得加上.sync
        isShow: Boolean,
        // 是否是多列模式，因为单列和多列传入的list都是一个数组，每个元素是JSON，所以单靠判断数组元素是不是JSON无法知道到底是多列还是单列
        // isMultiColumn: {
        //     type: Boolean,
        //     default: false
        // },
        // 出现下拉框的时候选中第几个，默认是空字符串，表示选中第1个
        value: {
            type: [Number, String, Array],
            default: ''
            // validator (newVal) {
            //     if (newVal === '' || typeof newVal === 'number' || Array.isArray(newVal)) {
            //         return true;
            //     }
            //     return false;
            // }
        },
        // 要取数组元素的哪个字段作为页面上文案展示
        filedLabelName: {
            type: String,
            default: 'text'
        },
        /**
         * 数据数组，每个元素可以是string也可以是JSON
         * 元素为string的时候，用数组元素本身作为文案展示页面上
         * 元素为JSON的时候，可以用属性`filedLabelName`来确定哪个字段作为文案展示
         */
        list: {
            type: Array,
            default () { return []; }
        }
    },
    data () {
        return {
            isHasShow: false, // 是否曾经isShow=true过
            // 数据源，如果是多列的，就和父组件传来的list属性一直，如果是单列，会将父组件list属性放在[]里面，形成[[]]格式
            pickerList: [],
            pickerValue: [], // 选中的位置索引
            // isMultiColumn: false, // 是否是多列
            iCurIndex: this.value || 0, // 选中的索引值
            iChangeColumnIndex: 0 // 每次改变pickerColumn后的索引
        };
    },
    watch: {
        isShow (newVal) {
            if (newVal && !this.isHasShow) {
                this._initData();
                this.isHasShow = true;
            }
        }
        // value (newVal) {
        //     this.iCurIndex = newVal;
        // }
    },
    create () {

    },
    methods: {
        /**
         * 初始化
         */
        _initData () {
            this.isMultiColumn = this.list.length && Array.isArray(this.list[0]);
            // 如果是单列的，重新组装下数据，和多列的数据格式保持一致，变成[[]]
            if (!this.isMultiColumn) {
                this.pickerList = [this.list];
                this.pickerValue = [this.value];
            } else {
                this.pickerList = this.list;
                if (!this.value) {
                    this.pickerValue = new Array(this.pickerList.length);
                }
            }
            // this.orginPickerValue = Object.assign([], this.pickerValue);
            // console.log('原来', this.orginPickerValue);
        },
        // 每次改变选择项，就算是选择了同一个也是会返回的,index为索引，下标0开始
        chagneColumn (columnIndex, index) {
            this.pickerValue[columnIndex] = index;
        },
        // 点击确定按钮， 才真正确定被选中的项
        sure () {
            for (let i = 0; i < this.pickerValue.length; i++) {
                // console.log(this.$refs[`pickerColumn-${i}`][0].getCurIndex());
                this.pickerValue[i] = this.$refs[`pickerColumn-${i}`][0].getCurIndex();
            }
            // this.orginPickerValue = Object.assign([], this.pickerValue);
            this.$emit('sure', this.isMultiColumn ? this.pickerValue : this.pickerValue[0]);
            this.$emit('input', this.isMultiColumn ? this.pickerValue : this.pickerValue[0]);
            this.close();
        },
        // 点击取消按钮，中间无论如何滚动都不认为
        cancel () {
            // this.pickerValue = Object.assign([], this.orginPickerValue);
            this.$emit('cancel');
            this.close();
        }
    }
};
</script>

<style lang="scss" scoped>
$lineHeight: 88px;
// 按钮共同样式
.y-picker-header-btn {
    padding: 20px;
    font-size: 32px;
    border: none;
    background: none;
    outline: none;

    &:active {
        background-color: $whiteActive;
    }
}

.cancel {
    color: #b2b2b2;
}

.sure {
    color: $meiBlue;
}

.y-picker {
    position: relative;
    top: 0;
    left: 0;
    height: 440px;
}
// 中间的横线方块-为了明显看出哪儿居中
.y-picker-hairline {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: $lineHeight; // 和文字的行高一样
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
    pointer-events: none; // 不加这个的话，当点击到.dp-hairline移动，不会触发ul的滚动，所以要加这个声明不响应点击
}
</style>
