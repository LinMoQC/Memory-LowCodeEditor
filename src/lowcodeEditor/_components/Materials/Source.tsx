import MonacoEditor, { OnMount } from '@monaco-editor/react'
import React from "react";
import {useLowCodeStore} from "../../hooks/useLowCode.ts";
import EditorSkeleton from "../EditorSkeleton.tsx";

const Source: React.FC = () => {
    const { components } = useLowCodeStore();

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    }
    return <MonacoEditor
        height={'100%'}
        path='components.json'
        loading={<EditorSkeleton />}
        language='json'
        onMount={handleEditorMount}
        value={JSON.stringify(components, null, 2)}
        className='dark: bg-dark'
        options={
            {
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6,
                },
                readOnly: true
            }
        }
    />
}

export default Source