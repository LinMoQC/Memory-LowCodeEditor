import { ComponentEvent } from "../stores/component-config";
import { useComponentsStore } from "../stores/componentes";
import TextArea from "antd/es/input/TextArea";

export function GoToLink(props: { event: ComponentEvent }) {
    const { event } = props
    const { curComponentId, curComponent, updateComponent } = useComponentsStore()

    function urlChange(eventName: string, value: string) {
        if (!curComponentId) return

        updateComponent(curComponentId, {
            [eventName]: {
                ...curComponent?.props?.[eventName],
                url: value
            }
        })
    }

    return <div className="mt-[10px]">
        <div className="flex items-center gap-[10px]">
            <div>跳转链接</div>
            <div>
                <TextArea 
                style={{width: 500,height: 200,border: '1px solid #000'}}
                onChange={(e) => {urlChange(event.name,e.target.value)}}
                value={curComponent?.props?.[event.name]?.url}
                />
            </div>
        </div>
    </div>
}