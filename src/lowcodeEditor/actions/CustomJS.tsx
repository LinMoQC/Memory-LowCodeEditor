import { useEffect, useState } from "react";
import MonacoEditor, { OnMount } from '@monaco-editor/react'
import {useLowCodeStore} from "../hooks/useLowCode.ts";

export interface CustomJSConfig {
    type: 'customJS',
    code: string
}

export interface CustomJSProps {
    defaultValue?: string
    value: string
    onChange?: (config: CustomJSConfig) => void
}

export function CustomJS(props: CustomJSProps) {
    const { defaultValue, onChange,value: val } = props;

    const { curComponentId } = useLowCodeStore();
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(val)
    },[val])

    function codeChange(value?: string) {
        if (!curComponentId) return;

        setValue(value);

        onChange?.({
            type: 'customJS',
            code: value!
        })
    }

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    }

    return (
        <div className="mt-[40px]">
            {/* 自定义 JS 编辑器 */}
            <div className="flex items-start gap-[16px]">
                {/* 标题部分 */}
                <div className="w-[100px] text-gray-600 font-medium">自定义 JS</div>
                {/* 编辑器部分 */}
                <MonacoEditor
                    width="100%"
                    height="400px"
                    path="action.js"
                    language="javascript"
                    onMount={handleEditorMount}
                    onChange={codeChange}
                    value={value}
                    options={{
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        minimap: { enabled: false },
                        scrollbar: {
                            verticalScrollbarSize: 6,
                            horizontalScrollbarSize: 6,
                        },
                    }}
                    className="border border-gray-300 rounded-md shadow-sm pt-3"
                />
            </div>
        </div>
    );    
}
