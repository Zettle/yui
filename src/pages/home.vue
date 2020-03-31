<template>
    <app-layout>
        <div class="ml-20 mr-20">
            <y-button class="mt-20" @click="$router.$push('/baseCom/icon')">字体图标</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/button')">按钮-组件</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/choice')">选择</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/picker')">picker</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/range')">滑动选择</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/loadingToast')">loading+toast</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/dialog')">对话框-dialog</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/actionsheet')">操作分支actionsheet</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/sidebar')">侧边栏sidebar</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/modal')">模拟窗modal</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/scroll')">下拉加载</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/ajax')">ajax+loading</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/datepicker')">时间选择器</y-button>
            <y-button class="mt-20" @click="$router.$push('/baseCom/upload')">上传</y-button>
        </div>
    </app-layout>
</template>
<script>
import yButton from '@/components/base/yButton';
export default {
    components: { yButton },
    created () {
        // this.$post('/api/data').then(rs => {
        //     console.log('res', rs);
        // });
    }
};
</script>
