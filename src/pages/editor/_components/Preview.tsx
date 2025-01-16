import React, { useMemo, useRef } from "react";
import { Component, useComponentsStore } from "../stores/componentes";
import { useComponentConfigStore } from "../stores/component-config";
import { message } from "antd";
import { ActionType } from "./ActionModal";
import EmptyStatus from "../../../common/empty";

const Preview: React.FC = () => {
    const { components } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore();

    const componentRefs = useRef<Record<string, any>>({});

    function handleEvent(component: Component) {
        const props: Record<string, any> = {}

        componentConfig[component.name].events?.forEach((event) => {
            const eventConfig = component.props[event.name];

            if (eventConfig) {
                props[event.name] = (...args: any[]) => {
                    eventConfig?.actions?.forEach((action: ActionType) => {
                        if (action.type === 'goToLink') {
                            window.location.href = action.url;
                        } else if (action.type === 'showMessage') {
                            if (action.config.type === 'success') {
                                message.success(action.config.text);
                            } else if (action.config.type === 'error') {
                                message.error(action.config.text);
                            }
                        } else if (action.type === 'customJS') {
                            // 沙箱📦
                            const createSandbox = (actionCode: string) => {
                                // 创建一个受限的上下文
                                const context: Record<string, any> = {
                                    name: component.name,
                                    props: component.props,
                                    showMessage(content: string) {
                                        message.success(content);
                                    }
                                };
                            
                                // 使用 Proxy 限制上下文的访问
                                const proxy = new Proxy(context, {
                                    set(target, prop, value) {
                                        if (prop in target) {
                                            if (typeof prop === 'string') {
                                                target[prop] = value;
                                            } else {
                                                throw new Error(`Cannot set property ${String(prop)}`);
                                            }
                                        } else {
                                            throw new Error(`Cannot set property ${String(prop)}`);
                                        }
                                        return true;
                                    },
                                    get(target, prop) {
                                        if (prop in target) {
                                            if (typeof prop === 'string') {
                                                return target[prop];
                                            } else {
                                                throw new Error(`Property ${String(prop)} is not accessible`);
                                            }
                                        } else {
                                            throw new Error(`Property ${String(prop)} is not accessible`);
                                        }
                                    }
                                });
                            
                                // 执行用户代码
                                const func = new Function('context', 'args', actionCode);
                                return func(proxy, args);
                            }
                            createSandbox(action.code);
                        } else if (action.type === 'componentMethod') {
                            const component = componentRefs.current[action.config.componentId];

                            if (component) {
                                component[action.config.method]?.(...args);
                            }
                        }

                    })

                }
            }
        })
        return props
    }

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]

            if (!config?.prod) {
                return null;
            }

            return React.createElement(
                config.prod,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    styles: component.styles,
                    ref: (ref: Record<string, any>) => { componentRefs.current[component.id] = ref },
                    ...config.defaultProps,
                    ...component.props,
                    ...handleEvent(component)  // 添加事件
                },
                renderComponents(component.children || [])
            )
        })
    }

    const isEmpty = useMemo(() => {
        return components[0].children && components[0].children?.length > 0
    },[components])

    return (
        <div className="bg-[#f7f7f9] w-[100%] h-[100%] p-5">
            <div className="bg-white shadow-lg min-h-[100%] rounded-md" style={{position: 'relative'}}>
            {isEmpty ? renderComponents(components) : <div className="absolute top-[40%] left-[48%] -translate-x-1/2 -translate-y-1/2">
                <EmptyStatus 
                description={'您还没有添加物料～'}
                width={400}
                height={400}
            />
                </div>}
            </div>
        </div>
    )
}

export default Preview
