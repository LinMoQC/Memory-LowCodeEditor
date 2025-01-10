import { useState } from "react";
import { ComponentEvent } from "../stores/component-config";
import { useComponentsStore } from "../stores/componentes";
import TextArea from "antd/es/input/TextArea";

export interface GoToLinkConfig{
    type: 'goToLink',
    url: string
}

export interface GoToLinkProps {
    defaultValue?: string;
    onChange?: (config: GoToLinkConfig) => void
}

export function GoToLink(props: GoToLinkProps) {
    const { onChange,defaultValue } = props
    const { curComponentId, curComponent, updateComponent } = useComponentsStore()
    const [value,setValue] = useState(defaultValue)

    function urlChange(value: string) {
        if (!curComponentId) return

        setValue(value)

        onChange?.({
            type: 'goToLink',
            url: value
        })
    }

    return <div className="mt-[10px]">
        <div className="flex items-center gap-[10px]">
            <div>跳转链接</div>
            <div>
                <TextArea 
                style={{width: 500,height: 200,border: '1px solid #000'}}
                onChange={(e) => {urlChange(e.target.value)}}
                value={value || ''}
                />
            </div>
        </div>
    </div>
}