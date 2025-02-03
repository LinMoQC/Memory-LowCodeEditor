import React, { MouseEventHandler, useState } from "react";
import HoverMask from "./HoverMask";
import SelectedMask from "./SelectedMask";
import {useLowCodeStore} from "../../hooks/useLowCode.ts";
import {useLowCodeConfigStore} from "../../hooks/useLowCodeConfig.ts";
import {LowCodeComponent} from "../../types/LowCodeType.ts";
import {MaterialDropProvider} from "memory-materials";

const EditArea:React.FC = () => {
    const {components,curComponentId,setCurComponentId,addComponent, deleteComponent, getComponentById,} = useLowCodeStore();
    const { componentConfig } = useLowCodeConfigStore();

    const [hoverComponentId, setHoverComponentId] = useState<string>();

    const handleMouseOver: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();

        for(let i = 0; i < path.length; i+=1) {
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset?.componentId;
            if(componentId){
                setHoverComponentId(componentId);
                return
            }
        }
    }

    const handleClick: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();

        for(let i = 0;i<path.length;i+=1){
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset?.componentId;
            if(componentId){
                // 两次点击同一个组件取消选中
                if(componentId === curComponentId){
                    setCurComponentId('');
                    return
                }
                setCurComponentId(componentId);
                return
            }
        }
    }

    function renderComponents(components: LowCodeComponent[]): React.ReactNode {
        return components.map((component: LowCodeComponent) => {
            const config = componentConfig?.[component.name];


            if(!config?.dev){
                return null;
            }

            return React.createElement(
                config.dev,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    ...config.defaultProps,
                    ...component.props,
                    styles: component.styles
                },
                renderComponents(component.children || [])
            )
        })
    }

    return (
        <MaterialDropProvider value={{addComponent, deleteComponent, getComponentById,componentConfig,components}}>
            <div
                className="h-[calc(100vh-80px)] edit-area overflow-y-auto rounded-lg shadow-md bg-white border-2 dark:bg-dark dark:text-dark"
                id="edit-area"
                onMouseOver={handleMouseOver}
                onMouseLeave={() => setHoverComponentId(undefined)}
                onClick={handleClick}
            >
                {renderComponents(components)}
                {hoverComponentId && hoverComponentId !== curComponentId &&
                    <HoverMask containerClassName="edit-area" portalWrapperClassName='portal-wapper'
                               componentId={hoverComponentId}/>
                }
                {curComponentId && (
                    <SelectedMask portalWrapperClassName='portal-wapper' containerClassName="edit-area"
                                  componentId={curComponentId}/>
                )}
                <div className="portal-wapper"></div>
            </div>
        </MaterialDropProvider>
    )
}

export default EditArea