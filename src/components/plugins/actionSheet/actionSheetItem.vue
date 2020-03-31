<template>
    <li class="action-sheet-item" @click="chooseItem">
        <slot></slot>
    </li>
</template>
<script>
export default {
    created () {
        // 获取父级actionSheet.vue下的子级actionSheetItem.vue的数量，并计算出索引值
        // 这里得到的索引将最后在用户点击某个item时候$emit出去
        // 从vux的源码得到这种写法
        let childs = this.$parent.$children;
        if (childs.length <= 0) {
            return;
        }
        childs.map((item, index) => {
            item.currentIndex = index;
        });
    },
    methods: {
        chooseItem () {
            // this.$actionSheet.chooseItem(this.index);
            this.$parent.chooseItem(this.currentIndex);
        }
    }
};
</script>
