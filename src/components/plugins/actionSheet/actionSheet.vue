<template>
    <!-- <transition name="fade">
        <div class="action-sheet-com" v-if="isShow">
            <div class="mask" @click="cancel"></div>
            <div class="action-sheet">
                <div class="action-sheet-title">
                    <slot name="header">
                        <h2 v-if="title" v-html="title"></h2>
                    </slot>
                </div>
                <ul class="action-sheet-list">
                    <slot>
                        <li class="action-sheet-item" v-for="(item, $index) of list" :key="$index" @click="chooseItem($index)">{{item[filedLabelName]}}</li>
                    </slot>
                </ul>
                <div class="action-sheet-cancel" @click="cancel">取 消</div>
            </div>
        </div>
    </transition> -->
    <y-popup :isShow="isShow" @cancel="cancel">
        <div class="action-sheet">
            <div class="action-sheet-title">
                <slot name="header">
                    <h2 v-if="title" v-html="title"></h2>
                </slot>
            </div>
            <ul class="action-sheet-list">
                <slot>
                    <li class="action-sheet-item" v-for="(item, $index) of list" :key="$index" @click="chooseItem($index)">{{item[filedLabelName]}}</li>
                </slot>
            </ul>
            <div class="action-sheet-cancel" @click="cancel">取 消</div>
        </div>
    </y-popup>
</template>

<script>
import yPopup from '../../base/yPopup';
import popupMixin from '../../utils/popupMixin.js';
export default {
    name: 'yActionSheet',
    mixins: [popupMixin],
    components: { yPopup },
    props: {
        list: {
            type: Array,
            default () {
                return [];
            }
        },
        filedLabelName: {
            type: String,
            default: 'text'
        },
        title: String // 标题
    },
    // 销毁后移除dom
    // destroyed () {
    //     this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
    // },
    methods: {
        // 点击取消按钮
        cancel () {
            this.$emit('cancel');
            this.close();
        },
        // 选择某个菜单项
        chooseItem (index) {
            this.$emit('choose', index);
            this.close();
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/com.scss';
// .action-sheet-com {
//     position: relative;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     z-index: $zIndex + 10;
// }
.fade-enter > .action-sheet,
.fade-leave-to > .action-sheet {
    transform: translateY(100%);
}

.fade-enter-to > .action-sheet {
    transform: translateY(0);
}

.action-sheet {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: $zIndex + 20;
    font-size: 30px;
    width: 100%;
    background-color: #efeff4;
    transform: translateY(0);
    transition: transform 0.1s ease-out;
}
// 遮罩，一部分在com.scss里
.mask {
    background-color: rgba(0, 0, 0, 0.3);
}
// 标题
.action-sheet-title {
    padding: 10px 0;
    font-size: 30px;
    color: #aaa;
    text-align: center;

    h2 {
        font-size: 30px;
    }
}
// 列表
.action-sheet-list {
    text-align: center;
    background-color: $white;

    /deep/ .action-sheet-item {
        position: relative;
        top: 0;
        left: 0;
        padding: 20px 0;
        border-top: 1px solid #ddd;

        &:last-child {
            // border-bottom: 1px solid #ddd;
        }

        &:active {
            background-color: darken($white, 10%);
        }
    }
}
// 取消
.action-sheet-cancel {
    padding: 20px 0;
    margin-top: 16px;
    text-align: center;
    background-color: $white;

    &:active {
        background-color: darken($white, 10%);
    }
}
</style>
