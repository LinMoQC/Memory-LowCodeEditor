import { create } from "zustand";
import Container from "../materirals/Container";
import Button from "../materirals/Button";
import Page from "../materirals/Page";
import { ComponentSetter } from "./componentes";

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    component: any;
    setter?: ComponentSetter[]
    desc: string;
    stylesSetter?: ComponentSetter[]
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
            component: Container,
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
            component: Button,
            desc: '按钮'    
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            component: Page,
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