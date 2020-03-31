// 由于很多组件是使用单例模式的，所以每次show会保留着上次的配置，这里需要每次show之前把值设置为默认，然后再根据传入的值覆盖默认
export default function mergeOptions ($vm, options) {
    let comPropOrigData = {};
    for (let propName in $vm.$options.props) {
        comPropOrigData[propName] = $vm.$options.props[propName].default;
    }
    let setting = Object.assign({}, comPropOrigData, options);
    for (let key in setting) {
        $vm[key] = setting[key];
    }
};
