<template>
    <div ref="pk-column"
        class="pk-column flex-1"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd">
        <ul :style="wrapperStyle">
            <li v-for="(item, $index) in list" :key="$index"
                :class="['pk-column-item', {active: curIndex === $index}]">
                {{ isJsonItem ? item[filedLabelName] : item}}
            </li>
        </ul>
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
        // 要去哪个字段展示文案，仅当数组元素为JSON的时候起作用
        filedLabelName: {
            type: String,
            default: 'text'
        },
        // 当前选中的值
        value: {
            type: [Number, String],
            default: 0
        }
    },
    data () {
        return {
            offset: 0, // 要放在这里，这样子watch和computed才会监听到
            curIndex: 0 // 当前哪个被选中，从
        };
    },
    watch: {
        list (newVal) {
            if (newVal.length) {
                this._initData();
            }
        }
    },
    computed: {
        count () {
            return this.list.length;
        },
        wrapperStyle () {
            return {
                transition: `${this.duration}ms`,
                transform: `translate3d(0, ${this.offset}px, 0)`
            };
        }
    },
    created () {
        this.isJsonItem = false; // 数组里面的每个元素是否是JSON
        this.startY = 0; // 点击时候Y坐标
        this.startOffset = 0;
        this.duration = 0; // transition的运动时间
        this.isTouchState = false; // 是否是被点击中状态
    },
    mounted () {
        if (this.list.length) {
            this._initData();
        }
    },
    methods: {
        _initData () {
            this.isJsonItem = typeof this.list[0] === 'object';
            this.itemHeight = this.$refs['pk-column'].querySelector('li').clientHeight; // 每一列的高度
            this.curIndex = this.value || 0;
            // 做下安全的校验
            if (this.curIndex >= this.list.length) {
                console.error('picker选中值超过数组长度');
            }
            this.offset = this.itemHeight * (2 - this.curIndex);
        },
        /**
         * 获取某个值num在最min和最max之间最大的那个值
         * 最小值不能小于min，最大值不能大于max
         */
        _getRange (num, min, max) {
            return Math.min(Math.max(num, min), max);
        },
        onTouchStart (ev) {
            this.isTouchState = true;
            this.startOffset = this.offset; // 记录下来当前位置，在touchmove的时候要用来计算
            this.startY = ev.touches[0].clientY;
            this.duration = 0;
        },
        onTouchMove (ev) {
            if (!this.isTouchState) {
                return;
            }
            ev.preventDefault();
            let deltaY = event.touches[0].clientY - this.startY + this.startOffset; // 手指移动了多少个px
            let mixDisY = -this.itemHeight * (this.count - 2); // -2是因为向上移动，保留2个可见
            let maxDisY = this.itemHeight * 3;
            this.offset = this._getRange(deltaY, mixDisY, maxDisY);
        },
        onTouchEnd (ev) {
            this.isTouchState = false;
            let index = Math.round(this.offset / this.itemHeight);
            index = this._getRange(index, -this.count + 3, 2);
            let targetDisY = index * this.itemHeight;
            this.duration = 200;
            this.offset = targetDisY;
            // if (this.curIndex !== 2 - index) {
            this.curIndex = 2 - index; // 数组中的索引值
            this.$emit('change', this.curIndex);
            // }
        },
        getCurIndex () {
            return this.curIndex;
        }
    }
};
</script>

<style lang="scss" scoped>
$lineHeight: 88px; // 和每一个的高度一致
.pk-column {
    height: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 32px;
    color: #b8b9b9;

    .pk-column-item {
        height: $lineHeight;
        line-height: $lineHeight;

        &.active {
            color: #000;
        }
    }
}
</style>
