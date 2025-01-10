import { create } from "zustand";
import { ComponentSetter } from "./componentes";
import { ContainerConfig } from "../../../materials/Container";
import { ButtonConfig } from "../../../materials/Button";
import { PageConfig } from "../../../materials/Page";
import { ModalConfig } from "../../../materials/Modal";
import { TableConfig } from "../../../materials/Table";
import { TableColumnConfig } from "../../../materials/TableColumn";
import { FormConfig } from "../../../materials/Form";
import { FormItemConfig } from "../../../materials/FormItem";

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    setter?: ComponentSetter[]
    desc: string;
    stylesSetter?: ComponentSetter[];
    dev: any;
    prod: any;
    events?: ComponentEvent[]
    methods?: ComponentMethod[]
}

// 组件事件
export interface ComponentEvent {
    name: string;
    label: string
}

export interface ComponentMethod {
    name: string;
    label: string
}

interface State {
    componentConfig: { [key: string]: ComponentConfig }
}

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Container: ContainerConfig,
        Button: ButtonConfig,
        Page: PageConfig,
        Modal: ModalConfig,
        Table: TableConfig,
        TableColumn: TableColumnConfig,
        Form: FormConfig,
        FormItem: FormItemConfig
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