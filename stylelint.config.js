module.exports = {
    'extends': 'stylelint-config-standard',
    'rules': {
        'indentation': [4], // 缩进为4个空格
        'unit-no-unknown': [true, {
            // 忽略rpx单位，即允许rpx作为单位，因为用了postcss-plugin-for-vue-px2rem-ignore1px插件，需要用1rpx
            ignoreUnits: ['Px']
        }]
    }
};
