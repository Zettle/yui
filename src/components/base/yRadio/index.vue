<template>
    <div class="y-radio-com">
        <slot>
            <div class="radio-item"
                v-for="item of list" :key="item[filedCodeName]"
                @click="selectHandle(item)">
                <!-- 文字和<i>不要有空格或者换行，不然间隙会比较大 -->
                <i :class="[value === item[filedCodeName] ? 'iconfont-selected' : 'iconfont-unselected'] "></i>
                {{item[filedLabelName]}}
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default () {
                return [];
            }
        },
        value: {
            type: [String, Number],
            default: ''
        },
        filedCodeName: {
            type: String,
            default: 'key'
        },
        filedLabelName: {
            type: String,
            default: 'text'
        }
    },
    methods: {
        // 点击相同元素的时候，一开始没有做取消动作，后面考虑到这种业务场景：当这一栏为非必填的时候，如果不做取消动作，那么最后这一栏都一直要选中状态
        selectHandle (item) {
            let result = '';
            let targetCode = item[this.filedCodeName];
            if (this.value !== targetCode) {
                result = targetCode;
            }
            this.$emit('input', result);
        }
    }
};
</script>

<style lang="scss" scoped>
.y-radio-com {
    .radio-item {
        display: inline-block;
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
