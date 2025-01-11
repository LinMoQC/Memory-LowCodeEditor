import { Input, Select } from "antd";
import { useComponentsStore } from "../stores/componentes";
import { useEffect, useState } from "react";

export interface ShowMessageConfig{
    type: 'showMessage',
    config: {
        type: 'success' | 'error'
        text: string
    }
}

export interface ShowMessageProps {
    value?: ShowMessageConfig['config']
    defaultValue?: ShowMessageConfig['config']
    onChange?: (config: ShowMessageConfig) => void
}

export function ShowMessage(props: ShowMessageProps) {
    const { value: val,defaultValue,onChange } = props

    const {curComponentId } = useComponentsStore()
    const [type,setType] = useState<'success' | 'error'>(defaultValue?.type || 'success')
    const [text,setText] = useState<string>(defaultValue?.text || '')

    useEffect(() => {
        if(val) {
            setType(val.type)
            setText(val.text)
        }
    }, [val]);

    function messageTypeChange(value: 'success' | 'error') {
        if (!curComponentId) return;

        setType(value);

        onChange?.({
            type: 'showMessage',
            config: {
                type: value,
                text
            }
        })
    }

    function messageTextChange(value: string) {
        if (!curComponentId) return;

        setText(value);

        onChange?.({
            type: 'showMessage',
            config: {
                type,
                text: value
            }
        })
    }

    return (
        <div className="mt-[30px] space-y-[40px]">
            {/* 类型选择 */}
            <div className="flex items-center gap-[16px]">
                <div className="w-[80px] text-right text-gray-600">类型：</div>
                <Select
                    style={{ width: '100%', maxWidth: '500px', height: '45px' }}
                    options={[
                        { label: '成功', value: 'success' },
                        { label: '失败', value: 'error' },
                    ]}
                    onChange={(value) => messageTypeChange(value)}
                    value={type}
                />
            </div>
    
            {/* 文本输入 */}
            <div className="flex items-center gap-[16px]">
                <div className="w-[80px] text-right text-gray-600">文本：</div>
                <Input
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        height: '45px',
                        padding: '8px',
                    }}
                    onChange={(e) => messageTextChange(e.target.value)}
                    value={text}
                    placeholder="请输入文本内容"
                />
            </div>
        </div>
    );
}