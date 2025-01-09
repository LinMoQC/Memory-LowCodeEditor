import { replace } from "lodash-es";
import { CSSProperties } from "react";
import { create } from "zustand";

export interface ComponentSetter {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}

export interface Component {
    id: number;
    name: string;
    props: any;
    children?: Component[];
    setter?: ComponentSetter;
    parentId?: number;
    desc: string;
    styles?: CSSProperties;
}

interface State {
    components: Component[];
    curComponentId?: number | null;
    curComponent: Component | null;

}

interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (componentId: number) => void;
    updateComponent: (componentId: number, props: any) => void;
    setCurComponentId: (componentId: number) => void;
    updateComponentStyles: (componentId: number,styles: CSSProperties,replace?: Boolean) => void
}

export const useComponentsStore = create<State & Action>(
    (set,get) => ({
        components: [
            {
                id: 1,
                name: 'Page',
                props: {},
                desc: '页面'
            }
        ],
        curComponent: null,
        curComponentId: null,
        setCurComponentId: (componentId) => {
            set((state) => ({
                curComponentId: componentId,
                curComponent: componentId !== null ? getComponentById(componentId, state.components) : null
            }))
        },
        addComponent: (component,parentId) => {
            set((state) => {
                if(parentId){
                    const parentComponent = getComponentById(
                        parentId,
                        state.components
                    );

                    if(parentComponent){
                        if(parentComponent.children){
                            parentComponent.children.push(component);
                        } else {
                            parentComponent.children = [component];
                        }

                        component.parentId = parentId;
                        return {components: [...state.components]};
                    }
                }
                return {components: [...state.components, component]};
            });
        },
        deleteComponent: (componentId) => {
            if(!componentId) return;

            const component = getComponentById(componentId, get().components);
            if(component?.parentId){
                const parentComponent = getComponentById(
                    component.parentId,
                    get().components
                );

                if(parentComponent){
                    parentComponent.children = parentComponent?.children?.filter(
                        (item) => item.id !== componentId
                    )
                }

                set({components: [...get().components]});
            }
        },
        updateComponent: (componentId, props) => {
            set((state) => {
                const component = getComponentById(componentId, state.components);
                if(component){
                    component.props = {...component.props, ...props};

                    return {components: [...state.components]};
                }

                return {components: [...state.components]};
            })
        },
        updateComponentStyles: (componentId,styles,replace) => 
            set((state) => {
                const component = getComponentById(componentId,state.components)
                if(component){
                    component.styles = replace ? {...styles} : {...component.styles,...styles}
                    return {components: [...state.components]}
                }

                return {components: [...state.components]};
            })
    })
)

export function getComponentById(
    id: number,
    components: Component[]
): Component | null {
    if(!id) return null;

    for(const component of components){
        if(component.id === id){
            return component;
        }

        if(component.children && component.children.length > 0){
            const child = getComponentById(id, component.children);
            if(child) return child;
        }
    }

    return null
}