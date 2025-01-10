import { Input, Select } from "antd";
import { ComponentEvent } from "../stores/component-config";
import { useComponentsStore } from "../stores/componentes";

export function ShowMessage(props: { event: ComponentEvent }) {
    const { event } = props

    const { curComponent, curComponentId, updateComponent } = useComponentsStore()

    function messageTypeChange(eventName: string, value: string) {
        if (!curComponentId) return;

        updateComponent(curComponentId, {
            [eventName]: {
                ...curComponent?.props?.[event.name],
                config: {
                    ...curComponent?.props?.[eventName]?.config,
                    type: value
                }
            }
        })
    }

    function messageTextChange(eventName: string, value: string) {
        if (!curComponentId) return;

        updateComponent(curComponentId, {
            [eventName]: {
                ...curComponent?.props?.[event.name],
                config: {
                    ...curComponent?.props?.[eventName]?.config,
                    text: value
                }
            }
        })
    }

    return <div className='mt-[10px]'>
        <div className='flex items-center gap-[10px]'>
            <div>类型：</div>
            <div>
                <Select
                    style={{ width: 500,height: 50 }}
                    options={[
                        { label: '成功', value: 'success' },
                        { label: '失败', value: 'error' },
                    ]}
                    onChange={(value) => { messageTypeChange(event.name, value) }}
                    value={curComponent?.props?.[event.name]?.config?.type}
                />
            </div>
        </div>
        <div className='flex items-center gap-[10px] mt-[10px]'>
            <div>文本：</div>
            <div>
                <Input
                    style={{ width: 500,height: 50}}
                    onChange={(e) => { messageTextChange(event.name, e.target.value) }}
                    value={curComponent?.props?.[event.name]?.config?.text}
                />
            </div>
        </div>
    </div>
}