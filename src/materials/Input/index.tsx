import { ComponentConfig } from "../../pages/editor/stores/component-config";

export const InputConfig: ComponentConfig = {
    name: "Input",  // 物料名称
    defaultProps: {},  // 默认属性，可以根据需求进行配置
    setter: [],  // 设置器，如果有需要的设置器可以添加
    desc: "Input 组件描述",  // 组件的描述，可以根据具体情况进行修改
    stylesSetter: [],  // 样式设置器，可以根据需求进行添加
    dev: {},  // 编辑状态，可以根据需要添加
    prod: {},  // 预览状态，可以根据需要添加
    events: [],  // 事件，可以添加具体的事件对象
    methods: [],  // 方法，可以添加具体的组件方法
    materialType: 'unit' // 物料类型
};
