import FlexItemDev from './dev'
import FlexItemProd from './prod'
import { ComponentConfig } from "../../pages/editor/stores/component-config";

export const FlexItemConfig: ComponentConfig = {
    name: "FlexItem",  // 物料名称
    defaultProps: {
        flexRatio: 1
    },  // 默认属性，可以根据需求进行配置
    setter: [
        {
            name: 'flexRatio',
            label: "弹性比例",
            type: 'input'
        }
    ],  // 设置器，如果有需要的设置器可以添加
    desc: "弹性容器项",  // 组件的描述，可以根据具体情况进行修改
    stylesSetter: [],  // 样式设置器，可以根据需求进行添加
    dev: FlexItemDev,  // 编辑状态，可以根据需要添加
    prod: FlexItemProd,  // 预览状态，可以根据需要添加
    events: [],  // 事件，可以添加具体的事件对象
    methods: [],  // 方法，可以添加具体的组件方法
    materialType: 'area' // 物料类型
};
