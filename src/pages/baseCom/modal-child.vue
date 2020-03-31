<template>
    <div>
        <y-button class="mt-20" @click.native="showLoading">model内的loading</y-button>
        <y-button class="mt-20" >model内的toast</y-button>
        <y-button class="mt-20" >model内的dialog</y-button>
        <y-button class="mt-20" >model内的modal</y-button>
        <h3>传递数据</h3>
        <input class="input" type="text" v-model="cname">
        <button type="button" @click="submit">按钮</button>
    </div>
</template>

<script>
import yButton from '@/components/base/yButton';
export default {
    components: { yButton },
    data () {
        return {
            cname: ''
        };
    },
    methods: {
        showLoading () {
            this.$showLoading('加载中', 2000);
        },
        submit () {
            this.$emit('submit',
                { cname: this.cname },
                { age: 23 }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.input {
    border: 1px solid red;
}
</style>
