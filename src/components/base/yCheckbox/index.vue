<template>
    <div class="y-check-com">
        <slot>
            <div class="y-check-item"
                v-for="(item, $index) of list" :key="item[filedCodeName]"
                @click="selectHandle($index)">
                <!-- 文字和<i>不要有空格或者换行，不然间隙会比较大 -->
                <i :class="[vals.indexOf($index) > -1 ? 'iconfont-checked' :'iconfont-unselected']"></i>
                {{item[filedLabelName]}}
            </div>
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        maxLen: Number, // 可以选择的最多个数，不传默认全部
        value: {
            type: Array,
            default () {
                return [];
            }
        },
        list: {
            type: Array,
            default () {
                return [];
            }
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
    computed: {
        vals () {
            return this.value;
        }
    },
    methods: {
        // 像父组件emit
        emit2Parent () {
            this.$emit('input', this.vals); // v-model绑定的是下标索引
        },
        // 选中的某项
        selectHandle (i) {
            let index = this.vals.indexOf(i);
            // 判断是否超过了最大限度，条件点击的那个将要变为选中状态并且如果选中就超过个数限制
            // 这样子才不影响用户点击取消选中
            if (this.maxLen && this.vals.indexOf(i) === -1) {
                if (this.vals.length + 1 > this.maxLen) {
                    return this.$emit('exceedMax'); // 告诉外界超过最大个数，并且不再继续
                }
            }
            if (this.vals.indexOf(i) === -1) {
                this.vals.push(i); // 没有的，添加到选中中
            } else {
                this.vals.splice(index, 1); // 已经有了，从选中中移除
            }
            this.vals.sort(); // 排序
            this.emit2Parent();
        }
    }
};
</script>
<style lang="scss" scoped>
.y-check-item {
    display: inline-block;
    margin-right: 30px;

    &:last-child {
        margin-right: 0;
    }
}
</style>
