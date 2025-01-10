import { create } from "zustand";
import { ComponentSetter } from "./componentes";
import { ContainerConfig } from "../materirals/Container";
import { ButtonConfig } from "../materirals/Button";
import { PageConfig } from "../materirals/Page";
import { ModalConfig } from "../materirals/Modal";
import { TableConfig } from "../materirals/Table";
import { TableColumnConfig } from "../materirals/TableColumn";

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
        TableColumn: TableColumnConfig
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