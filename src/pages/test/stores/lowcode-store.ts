import {create, StateCreator} from "zustand";
import {LowCodeAction, LowCodeComponent, LowCodeState} from "../../../lowcodeEditor/types/LowCodeType.ts";

const creator: StateCreator<LowCodeState & LowCodeAction> = (set, get) => {
    const getComponentById = (id: string, components: LowCodeComponent[]): LowCodeComponent | null => {
        if (!id) return null;
        for (const component of components) {
            if (component.id === id) {
                return component;
            }

            if (component.children && component.children.length > 0) {
                const child = getComponentById(id, component.children);
                if (child) return child;
            }
        }
        return null;
    };

    return {
        components: [
            {
                id: 'root',
                name: 'Page',
                props: {},
                desc: '页面'
            }
        ],
        curComponent: null,
        curComponentId: null,
        mode: 'edit',
        setMode: (mode) => set({ mode }),
        setCurComponentId: (componentId) => {
            set((state) => ({
                curComponentId: componentId,
                curComponent: componentId !== null ? getComponentById(componentId, state.components) : null
            }));
        },
        addComponent: (component, parentId) => {
            set((state) => {
                if (parentId) {
                    const parentComponent = getComponentById(
                        parentId,
                        state.components
                    );

                    if (parentComponent) {
                        if (parentComponent.children) {
                            parentComponent.children.push(component);
                        } else {
                            parentComponent.children = [component];
                        }

                        component.parentId = parentId;
                        return { components: [...state.components] };
                    }
                }
                return { components: [...state.components, component] };
            });
        },
        deleteComponent: (componentId) => {
            if (!componentId) return;

            const component = getComponentById(componentId, get().components);
            if (component?.parentId) {
                const parentComponent = getComponentById(
                    component.parentId,
                    get().components
                );

                if (parentComponent) {
                    parentComponent.children = parentComponent?.children?.filter(
                        (item) => item.id !== componentId
                    );
                }

                set({ components: [...get().components] });
            }
        },
        updateComponent: (componentId, props) => {
            set((state) => {
                const component = getComponentById(componentId, state.components);
                if (component) {
                    component.props = { ...component.props, ...props };

                    return { components: [...state.components] };
                }

                return { components: [...state.components] };
            });
        },
        updateComponentStyles: (componentId, styles, replace) =>
            set((state) => {
                const component = getComponentById(componentId, state.components);
                if (component) {
                    component.styles = replace ? { ...styles } : { ...component.styles, ...styles };
                    return { components: [...state.components] };
                }

                return { components: [...state.components] };
            }),
        getComponentById
    };
};

export const useLowCodeStore = create<LowCodeState & LowCodeAction>()(creator);