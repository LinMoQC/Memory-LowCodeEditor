// 物料类型
import {LowCodeComponentSetter} from "./LowCodeType.ts";

export type MaterialType = 'unit' | 'area' | 'special'

export interface LowCodeComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    setter?: LowCodeComponentSetter[]
    desc: string;
    stylesSetter?: LowCodeComponentSetter[];
    dev: any;
    prod: any;
    events?: LowCodeComponentEvent[]
    methods?: LowCodeComponentMethod[],
    materialType: MaterialType,
}

// 组件事件
export interface LowCodeComponentEvent {
    name: string;
    label: string
}

export interface LowCodeComponentMethod {
    name: string;
    label: string
}

export interface LowCodeConfigState {
    componentConfig: { [key: string]: LowCodeComponentConfig }
}

export interface LowCodeConfigAction {
    registerComponent: (name: string, componentConfig: LowCodeComponentConfig) => void;
}