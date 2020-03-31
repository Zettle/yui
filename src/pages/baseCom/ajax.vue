<template>
    <app-layout>
        <h1>post请求</h1>
        <y-button class="mt-20" @click.native="fetchPost">post</y-button>

        <h1>get请求</h1>
        <y-button class="mt-20" @click.native="fetchGet">get</y-button>

        <h1>取消所有ajax请求</h1>
        <y-button class="mt-20" @click.native="startMutilAjax">发起多个请求，所有接口需要5s返回</y-button>
        <y-button class="mt-20" @click.native="cancelMutilAjax">5s前取消请求</y-button>

        <h1>formData请求</h1>
        <input type="file" ref="input-file">
        <y-button class="mt-20" @click.native="postFormData">formData</y-button>
        <y-button class="mt-20" @click.native="cancelFormData">取消上传</y-button>

        <h1>formData-blob请求</h1>
        <input type="file" ref="input-file-2" />
        <y-button class="mt-20" @click.native="postFormData2">formData-blob</y-button>

        <h1>并发请求A(4s)+B(1s)+C(6s)</h1>
        <p>只出现一个loading，并且持续6s</p>
        <y-button class="mt-20" @click.native="concurrent">并发</y-button>

        <h1>串联请求A(4s) => B(1s) => C(6s)</h1>
        <p>只出现一个loading，并且持续11s</p>
        <y-button class="mt-20" @click.native="series">串联请求</y-button>

        <h1>串并请求A(4s) + B(1s) => C(6s)</h1>
        <p>只出现一个loading，并且持续10s</p>
        <y-button class="mt-20" @click.native="concurAndseries">串并联请求</y-button>

        <h1>并串请求A(4s)， B(1s) => C(6s)</h1>
        <p>只出现一个loading，并且持续10s</p>
        <y-button class="mt-20" @click.native="seriesAndCon">并串联请求</y-button>

        <h1>异常请求A(4s)+B(1s)+D</h1>
        <p>不存在D接口，loading直接消失出现toast</p>
        <y-button class="mt-20" @click.native="errFetch">异常</y-button>
    </app-layout>
</template>

<script>
import yButton from '@/components/base/yButton';
import picTool from '@/js/picTool';
import ajaxToken from '@/js/ajaxToken';
export default {
    components: { yButton },
    methods: {
        fetchAjax (apiName, duration = 0) {
            return this.$post(`http://localhost:3000/api/${apiName}`, { duration });
        },
        // post请求
        fetchPost () {
            this.$post('/infoAnno/getInfoAnnoList.do', {
                page: 1,
                pageSize: 10,
                channel: 20,
                clientType: 3
            }).then(res => {
                console.log('请求回来', res);
            });
        },
        // 单纯get请求
        fetchGet () {
            this.$get(`http://localhost:3000/api/fetchget`, {
                page: 1,
                pageSize: 10,
                channel: 20,
                clientType: 3
            }).then(res => {
                console.log('请求回来', res);
            });
        },
        // formData请求
        postFormData () {
            let _this = this;
            let oInput = this.$refs['input-file'];
            if (oInput.files.length) {
                let fileData = oInput.files[0];
                this.$postFormData(`http://localhost:3000/api/uploadfile`, {
                    file: fileData,
                    name: 'huang'
                }, {
                    getCancelTokenName (cancelTokenName) {
                        _this.cancelTokenName = cancelTokenName;
                        console.log(this.cancelTokenName);
                    }
                }).then(res => {
                    console.log('请求回来', res);
                });
            }
        },
        // 取消上传
        cancelFormData () {
            console.log('cancelTokenName', this.cancelTokenName);
            ajaxToken.removeAxiosQueueByName(this.cancelTokenName);
        },
        // 上传，先转为base64
        postFormData2 () {
            let oInput = this.$refs['input-file-2'];
            if (oInput.files.length) {
                let fileData = oInput.files[0];
                // file转为base64位
                picTool.getPicDataUrl(fileData).then(dataInfo => {
                    this.$postFormData(`http://localhost:3000/api/uploadfile`, {
                        file: picTool.getPicBlobByDataUrl(dataInfo.dataUrl), // base64转为blob
                        name: 'huang'
                    }).then(res => {
                        console.log('请求回来', res);
                    });
                });
            }
        },
        consoleSecond () {
            let second = 1;
            let timer = null;
            timer && clearInterval(timer);
            console.log(`${second}s`);
            timer = setInterval(() => {
                console.log(`${++second}s`);
            }, 1000);
        },
        /**
         * 并发请求
         * 并发请求A(4s)+B(1s)+C(6s)
         * 只出现一个loading，并且持续6s
         */
        concurrent () {
            this.fetchAjax('a', 4000);
            this.fetchAjax('b', 1000);
            this.fetchAjax('c', 6000);
        },
        /**
         * 异常请求
         * 并发请求A(4s)+B(1s)+D
         * 不存在D，不等A/B了，直接toast提示
         */
        errFetch () {
            this.fetchAjax('a', 4000);
            this.fetchAjax('b', 1000);
            this.fetchAjax('d', 6000);
        },
        /**
         * 串联请求A(4s) => B(1s) => C(6s)
         * 只出现一个loading，并且持续11s
         */
        series () {
            this.fetchAjax('a', 4000)
                .then(() => {
                    return this.fetchAjax('b', 1000);
                })
                .then(() => {
                    return this.fetchAjax('c', 6000);
                });
        },
        /**
         * 串并请求A(4s) + B(1s) => C(6s)
         * 只出现一个loading，并且持续10s
         */
        concurAndseries () {
            Promise.all([this.fetchAjax('a', 4000), this.fetchAjax('b', 1000)]).then(() => {
                this.fetchAjax('c', 6000);
            });
        },
        /**
         * 并串请求A(4s)， B(1s) => C(6s)
         * A跟B并发请求，A请求完没事了，B请求完请求C
         * loading持续7000
         */
        seriesAndCon () {
            this.fetchAjax('a', 4000);
            this.fetchAjax('b', 1000).then(() => {
                this.fetchAjax('c', 6000);
            });
        },
        /**
         * 取消ajax请求
         * 发去请求，接口需要5s返回，在5s前取消掉
         */
        startAjax () {
            this.fetchAjax('a', 4000).then(res => {});
        },
        cancelAjax () {},
        /**
         * 取消所有ajax请求
         * 发去多个ajax请求，接口需要5s返回，在5s前取消掉
         */
        startMutilAjax () {
            this.fetchAjax('a', 5000);
            this.fetchAjax('b', 5000);
            this.fetchAjax('c', 5000);
        },
        cancelMutilAjax () {
            ajaxToken.removeAllAxiosQueue();
        }
    }
};
</script>

<style lang="scss" scoped>
h1 {
    margin-top: 40px;
    font-size: 32px;
    color: #fff;
    background-color: #35495e;
}
</style>
