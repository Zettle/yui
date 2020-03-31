const svgtofont = require('svgtofont');
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir); // 原来的cli2是在build里面，这里就不需要回退了
}

svgtofont({
    emptyDist: true, // 清空dist目录
    src: resolve('./src'), // svg 图标目录路径
    dist: resolve('./dist'), // 输出到指定目录中
    svgicons2svgfont: {
        normalize: true // 要加这个，不然字体会变形，缩放icon使的最适应最大的icon
    },
    website: {
        title: '',
        logo: '',
        version: '',
        meta: {
            description: '',
            keywords: ''
        },
        description: '',
        links: [],
        footerInfo: ''
    }
}).then(() => {
    console.log('done!');
}); ;
