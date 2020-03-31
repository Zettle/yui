module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-throw-literal': 0, // 允许用字面量{}抛出异常
        'arrow-parens': 0,
        'semi': [2, 'always'], // 语句强制分号结尾
        'indent': [2, 4, { // 缩进风格
            'SwitchCase': 1
        }],
        'one-var': 0, // 一个let或者var只能生命一个变量
        'generator-star-spacing': 0,
        'no-debugger': 2 // 禁止debugger
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
