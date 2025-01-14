import { ComponentConfig } from "../../pages/editor/stores/component-config";
import ButtonDev from "./dev";
import ButtonProd from "./prod";

export const ButtonConfig: ComponentConfig = {
    name: 'Button',
    defaultProps: {
        type: 'primary',
        text: '按钮',
        danger: false, 
        size: 'middle', 
    },
    setter: [
        {
            name: 'type',
            label: '按钮类型',
            type: 'select',
            options: [
                { label: '主按钮', value: 'primary' },
                { label: '次按钮', value: 'default' },
                { label: '虚线按钮', value: 'dashed' },
                { label: '文本按钮', value: 'text' },
                { label: '链接按钮', value: 'link' },
            ]
        },
        {
            name: 'danger',
            label: '危险按钮',
            type: 'switch', 
        },
        {
            name: 'size',
            label: '按钮大小',
            type: 'select',
            options: [
                { label: '大', value: 'large' },
                { label: '中', value: 'middle' },
                { label: '小', value: 'small' },
            ]
        },
        {
            name: 'text',
            label: "文本",
            type: 'input'
        }
    ],
    stylesSetter: [
        {
            name: 'width',
            label: '宽度',
            type: 'inputNumber'
        },
        {
            name: 'height',
            label: '高度',
            type: 'inputNumber',
        }
    ],
    events: [
        {
            name: 'onClick',
            label: '点击事件'
        },
        {
            name: 'onDoubleClick',
            label: '双击事件'
        }
    ],
    dev: ButtonDev,
    prod: ButtonProd,
    desc: '按钮',
    materialType: 'unit'
}
