module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-pxtorem': {
            rootValue: 75,
            propList: ['*'],
            minPixelValue: 2 // 小于2px的不会转为rem，等于2的还是会转
            // selectorBlackList: [/^.van-\w*/] // 不要转vant的，他们是375位基准的
        }
    }
};
