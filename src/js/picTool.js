class PicTool {
    /**
     * 将文件转为base64
     * @param file 文件对象，比如<input>的ev.target.files[0]
     * @return Promise 内容如下
     *      dataUrl 文件的base64
     *      width 图片的宽度
     *      height 图片的高度
     * 调用：utils.getPicDataUrl(this.$refs['input-file'].files[0], false)
     */
    getPicDataUrl (file) {
        let res = {
            dataUrl: '',
            width: 0,
            height: 0
        };
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                res.dataUrl = this.result; // 强制转为字符串
                let oImg = new Image();
                oImg.src = res.dataUrl;
                oImg.onload = function () {
                    res.width = oImg.width;
                    res.height = oImg.height;
                    resolve(res);
                };
            };
        });
    }

    /**
     * 将base64图片转为blob文件类型
     */
    getPicBlobByDataUrl (dataURI, contentType = 'image/jpg') {
        // 链接：https://www.cnblogs.com/dcb3688/p/4608062.html
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
        let byteString = atob(dataURI.split(',')[1]); // base64 解码
        let arrayBuffer = new ArrayBuffer(byteString.length); // 创建缓冲数组
        let intArray = new Uint8Array(arrayBuffer); // 创建视图
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([intArray], { type: mimeString });
    }
}

export default new PicTool();
