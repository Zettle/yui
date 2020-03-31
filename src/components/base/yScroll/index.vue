<template>
    <div class="scroll-com"
        @touchstart="touchStartHandle"
        @touchmove="touchMoveHandle"
        @touchend="touchEndHandle"
        @scroll="scrollHandle">
        <div :class="['scroll', { 'touching': isTouching }]"
            :style="{
                transform: 'translate3d(0, ' + top + 'px, 0)'
            }">
            <!-- 下拉时提示语 -->
            <div class="refresh-layer flex justify-center align-center"
                :class="{
                    'is-down': state === 0,
                    'is-up': state === 1,
                    'is-loading': state === 2
                }">
                <i class="icon arrow-down-icon"></i>
                <i class="icon loading-icon"></i>
                <!-- <span>{{state | mapDate({
                    0: '下拉刷新',
                    1: '释放刷新',
                    2: '正在加载..'
                })}}</span> -->
                <span class="refresh-text refresh-text-down">下拉刷新</span>
                <span class="refresh-text refresh-text-up">释放刷新</span>
                <span class="refresh-text refresh-text-loading">正在加载</span>
            </div>
            <slot></slot>
            <!-- 上拉时提示语 -->
            <div class="infinite-layer flex justify-center align-center">
                <template v-if="isNoMoreData">
                    <span>暂无更多数据</span>
                </template>
                <template v-else>
                    <i class="loading-icon"></i><span>正在加载..</span>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 原理
 * 外层设置 overflow-y: auto; 不能设置 hidden，因为如果不超过顶的时候，想要依靠自有滚动滚就好了，
 * 内层设置 top= -refreshLayer高度 这样子既可以保证初始看不到refreshLayer，又保证外层初始的scrollTop=0，避免不必要的计算
 */
export default {
    data () {
        return {
            isNoMoreData: false, // 是否是“暂无更多数据”状态
            isTouching: false, // 是否处于被点击状态
            top: 0, // scroll的translate的距离
            offset: 44, // refreshLayer的朝上箭头，移动44px的时候变成朝下
            state: 0 // 0-refreshLayer箭头朝下 1-refreshLayer箭头朝上 2-refreshLayer正在加载
        };
    },
    // 放弃这种，每次都会执行
    // filters: {
    //     mapDate (val, codeList) {
    //         return codeList[val] || '';
    //     }
    // },
    methods: {
        // 手指按下监听
        touchStartHandle (e) {
            this.isTouching = true;
            this.startY = e.targetTouches[0].pageY;
        },
        // 手指移动监听
        touchMoveHandle (e) {
            if (!this.isTouching || this.$el.scrollTop > 0) {
                return;
            }
            let diff = e.targetTouches[0].pageY - this.startY;
            if (diff > 0) {
                e.preventDefault(); // 阻止默认行为，比如在微信中不加这个，下拉会变成webview移动
            }
            this.top = Math.pow(diff, 0.8);
            if (this.top >= this.offset) {
                this.state = 1; // 箭头朝上
            } else {
                this.state = 0; // 箭头朝下
            }
        },
        // 手指抬起监听
        touchEndHandle () {
            this.isTouching = false;
            if (this.state === 1) { // 如果箭头朝上，说明大于目标距离offset，可以展示loading了
                this.startRefresh();
            }
            if (this.state === 0) { // 如果箭头朝下，说明小于目标距离offset，恢复未下拉前状态
                this.refreshDone();
            }
        },
        // 开始loading，距离top渐渐变到目标距离offset，并且开始loading
        startRefresh () {
            this.state = 2; // 状态改为loading
            this.top = this.offset; // 距离渐变到目标距离offsest
            this.$emit('refresh', this.refreshDone);
        },
        /**
         * 下拉加载结束-恢复未下拉状态，滑到top为0
         */
        refreshDone () {
            this.state = 0;
            this.top = 0;
        },
        /**
         * 滚动监听：由于不是下拉的时候，是依赖普通overflow:auto滚动
         * 所以用这种方式监听实现监听上拉距离，用于判断是否触发上拉回调
         */
        scrollHandle () {
            if (this.infiniteLoading) { // 如果已经刷到“加载更多”了，就不再继续，不然会一直触发
                return;
            }
            let outerHeight = this.$el.clientHeight; // 外层(设置了溢出滚动条)的高度
            let innerHeight = this.$el.querySelector('.scroll').clientHeight; // 内层(超高的那层)的高度
            let scrollTop = this.$el.scrollTop; // 滚动的距离
            let ptrHeight = this.$el.querySelector('.refresh-layer').clientHeight; // 顶部“下拉加载”层级的高度
            let infiniteHeight = this.$el.querySelector('.infinite-layer').clientHeight; // 底部“加载更多”层级的高度
            // console.log(outerHeight, innerHeight, ptrHeight, scrollTop);// 627 1800 40 1089
            let bottom = innerHeight - outerHeight - scrollTop - ptrHeight; // 计算得到外层距离内层最底边的距离
            if (bottom < infiniteHeight) {
                this.startInfinite();
            }
        },
        /**
         * 开始广播infinite事件，外界开始加载更多数据，并把处理完成函数作为参数传递给外面，让外面调用
         */
        startInfinite () {
            this.infiniteLoading = true;
            this.$emit('infinite', this.infiniteDone, this.noMoreDateCn);
        },
        /**
         * 加载更多处理完成
         */
        infiniteDone () {
            this.infiniteLoading = false;
            this.isNoMoreData = false;
            console.log('处理完成');
        },
        noMoreDateCn () {
            this.infiniteLoading = false;
            this.isNoMoreData = true;
            console.log('暂无更多数据');
        }
    }
};
</script>
<style lang="scss" scoped>
$layerHeight: 80px;
// 外层，宽高由父级决定
.scroll-com {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #f5f5f5;
    overflow-y: auto;
    // 内层，真正发生滚动的这一层
    .scroll {
        position: absolute;
        top: -$layerHeight;
        left: 0;
        width: 100%;
        transition: transform 0.3s ease-in-out;

        &.touching {
            transition-duration: 0s;
        }
    }
}
// 下拉时提示语
.refresh-layer,
.infinite-layer {
    height: $layerHeight;
    font-size: 28px;
    color: #aaa;
}
// 箭头样式
.arrow-down-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 40'><path fill='%238c8c8c' d='M9 22V0h8v22h9L13.5 40 0 22z'/></svg>") no-repeat center center;
    background-size: 20px 32px;
    transition: all 0.3s;
    transform: rotate(0deg);
    transform-origin: center center;
}

.refresh-layer {
    // 默认所有文字和icon隐藏
    .refresh-text,
    .icon {
        display: none;
    }
}

// 在小于目标距离时：箭头图标出现朝下，loading图标隐藏，下拉加载文字出现，其他文字隐藏
.is-down {
    .arrow-down-icon {
        display: block;
    }

    .refresh-text-down {
        display: block;
    }
}
// 在超过目标距离时：箭头图标出现朝上，loading图标隐藏，释放加载文字出现，其他文字隐藏
.is-up {
    .arrow-down-icon {
        display: block;
        transform: rotate(180deg);
    }

    .refresh-text-up {
        display: block;
    }
}
// 在loading时：箭头图标隐藏，loading图标出现，loading文字出现，其他文字隐藏
.is-loading {
    .arrow-down-icon {
        display: none;
    }

    .loading-icon,
    .refresh-text-loading {
        display: block;
    }
}
// 底部提示层
.loading-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    background-image: url("data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><path id='a' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round' d='M60 7v20'/></defs><use xlink:href='%23a' opacity='.27'/><use xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/><use xlink:href='%23a' opacity='.27' transform='rotate(60 60 60)'/><use xlink:href='%23a' opacity='.27' transform='rotate(90 60 60)'/><use xlink:href='%23a' opacity='.27' transform='rotate(120 60 60)'/><use xlink:href='%23a' opacity='.27' transform='rotate(150 60 60)'/><use xlink:href='%23a' opacity='.37' transform='rotate(180 60 60)'/><use xlink:href='%23a' opacity='.46' transform='rotate(210 60 60)'/><use xlink:href='%23a' opacity='.56' transform='rotate(240 60 60)'/><use xlink:href='%23a' opacity='.66' transform='rotate(270 60 60)'/><use xlink:href='%23a' opacity='.75' transform='rotate(300 60 60)'/><use xlink:href='%23a' opacity='.85' transform='rotate(330 60 60)'/></svg>");
    animation: preloader-spin 1s steps(12, end) infinite;
}

@keyframes preloader-spin {
    100% { transform: rotate(360deg); }
}
</style>
