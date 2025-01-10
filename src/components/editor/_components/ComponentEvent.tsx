import React, { useState } from "react";
import { useComponentsStore } from "../stores/componentes";
import { useComponentConfigStore } from "../stores/component-config";
import type { ComponentEvent } from "../stores/component-config";
import { Button, Collapse, CollapseProps} from "antd";
import { ActionModal } from "./ActionModal";

const ComponentEvent: React.FC = () => {
    const { curComponentId, curComponent, updateComponent } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [curEvent, setCurEvent] = useState<ComponentEvent>();

    if (!curComponent) return null



    const items: CollapseProps['items'] = (componentConfig[curComponent.name].events || []).map(event => {
        return {
            key: event.name,
            label: <div className='flex justify-between leading-[30px]'>
                {event.label}
                <Button type="primary" onClick={() => {
                    setCurEvent(event);
                    setActionModalOpen(true);
                }}>添加动作</Button>
            </div>,
            children: <div>
                
            </div>
        }
    })

    return <div className='px-[10px]'>
        <Collapse className='mb-[10px]' items={items}/>
        <ActionModal visible={actionModalOpen} eventConfig={curEvent!} handleOk={() => {
            setActionModalOpen(false)
        }} handleCancel={() => {
            setActionModalOpen(false)
        }}/>
    </div>
}

export default ComponentEvent