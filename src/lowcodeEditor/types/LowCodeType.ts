import {CSSProperties} from "react";

export interface LowCodeComponentSetter {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}

export interface LowCodeComponent {
    id: string;
    name: string;
    props: any;
    children?: LowCodeComponent[];
    setter?: LowCodeComponentSetter;
    parentId?: string;
    desc: string;
    styles?: CSSProperties;
}

export interface LowCodeState {
    components: LowCodeComponent[];
    curComponentId?: string | null;
    curComponent: LowCodeComponent | null;
    mode: 'edit' | 'preview'
}

export interface LowCodeAction {
    addComponent: (component: LowCodeComponent, parentId?: string) => void;
    deleteComponent: (componentId: string) => void;
    updateComponent: (componentId: string, props: any) => void;
    setCurComponentId: (componentId: string) => void;
    updateComponentStyles: (componentId: string, styles: CSSProperties, replace?: boolean) => void
    setMode: (mode: LowCodeState['mode']) => void;
    getComponentById: (id: string, components: LowCodeComponent[]) => LowCodeComponent | null;
}