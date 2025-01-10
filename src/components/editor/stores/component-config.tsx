import { create } from "zustand";
import ContainerDev from "../materirals/Container/dev";
import ButtonDev from "../materirals/Button/dev";
import PageDev from "../materirals/Page/dev";
import ContainerProd from "../materirals/Container/prod";
import ButtonProd from "../materirals/Button/prod";
import PageProd from "../materirals/Page/prod";
import { ComponentSetter } from "./componentes";

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    setter?: ComponentSetter[]
    desc: string;
    stylesSetter?: ComponentSetter[];
    dev: any;
    prod: any;
    events?: ComponentEvent[]
}

export interface ComponentEvent {
    name: string;
    label: string
}


interface State {
    componentConfig: {[key: string]: ComponentConfig}
}

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Container: {
            name: 'Container',
            defaultProps: {},
            dev: ContainerDev,
            prod: ContainerProd,
            desc: '容器'
        },
        Button: {
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
                        {label: '主按钮', value: 'primary'},
                        {label: '次按钮', value: 'default'},
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
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            dev: PageDev,
            prod: PageProd,
            desc: '页面'
        }
    },
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}));