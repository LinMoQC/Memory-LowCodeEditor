import React from "react";
import { Component, useComponentsStore } from "../stores/componentes";
import { useComponentConfigStore } from "../stores/component-config";
import { message } from "antd";
import { GoToLinkConfig } from "../actions/GoToLink";
import { ShowMessageConfig } from "../actions/ShowMessage";

const Preview:React.FC = () => {
    const { components } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore();

    function handleEvent(component: Component){
        const props:Record<string,any> = {}

        componentConfig[component.name].events?.forEach((event) => {
            const eventConfig = component.props[event.name];

            if(eventConfig){
                props[event.name] = () => {
                    eventConfig?.actions?.forEach((action: GoToLinkConfig | ShowMessageConfig ) => {
                        if (action.type === 'goToLink' && eventConfig.url) {
                            window.location.href = eventConfig.url;
                        } else if (action.type === 'showMessage' && eventConfig.config) {
                            if (eventConfig.config.type === 'success') {
                                message.success(eventConfig.config.text);
                            } else if (eventConfig.config.type === 'error') {
                                message.error(eventConfig.config.text);
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
                    ...config.defaultProps,
                    ...component.props,
                    ...handleEvent(component)  // 添加事件
                },
                renderComponents(component.children || [])
            )
        })
    }

    return (
        <div>
        {renderComponents(components)}
    </div>
    )
}

export default Preview
