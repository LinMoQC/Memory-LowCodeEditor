import { ComponentConfig } from "../../components/editor/stores/component-config";
import ButtonDev from "./dev";
import ButtonProd from "./prod";

export const ButtonConfig: ComponentConfig = {
    name: 'Button',
    defaultProps: {
        type: 'primary',
        text: '按钮'
    },
    setter: [
        {
            name: 'type',
            label: '按钮类型',
            type: 'select',
            options: [
                { label: '主按钮', value: 'primary' },
                { label: '次按钮', value: 'default' },
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
    desc: '按钮'
}
