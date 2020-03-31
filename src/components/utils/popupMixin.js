import pool from '@/js/pool';

export default {
    props: {
        isShow: Boolean // 是否展示，sync同步更新
    },
    mounted () {
        if (!this.$options.name) {
            console.error('popupMixin要求引用的每个组件都定义好name');
        }
    },
    watch: {
        isShow (newVal) {
            if (newVal) {
                // 挂载到vue.$yui上面去，在路由切换beforeEach的时候用到
                // comName为各组件的名称，目前已经有dialog/actionSheet
                pool.$yui[this.$options.name] = this;
            } else {
                pool.$yui[this.$options.name] = null;
            }
        }
    },
    methods: {
        close () {
            this.$emit('update:isShow', false);
        },
        // 在beforeEach调用
        removeFromDom () {
            this.close();
        }
    }
};
