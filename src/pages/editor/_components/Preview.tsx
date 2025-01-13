import React, { useEffect, useRef } from "react";
import { Component, useComponentsStore } from "../stores/componentes";
import { useComponentConfigStore } from "../stores/component-config";
import { message } from "antd";
import { ActionType } from "./ActionModal";

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
                            const func = new Function('context', 'args', action.code);
                            func({
                                name: component.name,
                                props: component.props,
                                showMessage(content: string) {
                                    message.success(content)
                                }
                            }, args);
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

    return (
        <div className="bg-[#f7f7f9] w-[100%] h-[100%] p-5">
            <div className="bg-white shadow-lg min-h-[100%] rounded-md">
            {renderComponents(components)}
            </div>
        </div>
    )
}

export default Preview
