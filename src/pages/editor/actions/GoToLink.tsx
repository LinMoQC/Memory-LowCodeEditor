import { useEffect, useState } from "react";
import { useComponentsStore } from "../stores/componentes";
import TextArea from "antd/es/input/TextArea";

export interface GoToLinkConfig {
    type: 'goToLink',
    url: string
}

export interface GoToLinkProps {
    defaultValue?: string;
    value: string
    onChange?: (config: GoToLinkConfig) => void
}

export function GoToLink(props: GoToLinkProps) {
    const { onChange, defaultValue, value: val } = props
    const { curComponentId } = useComponentsStore()
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        setValue(val)
    }, [val])

    function urlChange(value: string) {
        if (!curComponentId) return

        setValue(value)

        onChange?.({
            type: 'goToLink',
            url: value
        })
    }

    return <div className="mt-[20px]">
        <div className="flex items-center gap-[10px]">
            {/* 标签部分 */}
            <div className="w-[80px] text-right text-gray-600">跳转链接：</div>
            {/* 输入框部分 */}
            <TextArea
                className="flex-1"
                style={{
                    minHeight: '40px',
                    border: '1px solid #000',
                    padding: '8px',
                    borderRadius: '4px',
                }}
                onChange={(e) => urlChange(e.target.value)}
                value={value || ''}
                placeholder="请输入跳转链接"
            />
        </div>
    </div>
}