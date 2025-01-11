import MonacoEditor, { OnMount, EditorProps } from '@monaco-editor/react'
import { editor } from "monaco-editor";
import { Fragment } from 'react/jsx-runtime';
import Loading from '../../../common/loading';

export interface EditorFile {
    name: string;
    value: string;
    language: string
}

interface Props {
    value: string
    onChange?: EditorProps['onChange']
    options?: editor.IStandaloneDiffEditorConstructionOptions
}

export default function (props: Props) {
    const { value, onChange, options } = props

    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        })
    }

    return (
        <MonacoEditor
            height={'100%'}
            width={"100%"}
            className='z-20'
            path='component.css'
            loading={<Fragment>
                <Loading />
            </Fragment>}
            language='css'
            onMount={handleEditorMount}
            onChange={onChange}
            value={value}
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
                    fixedOverflowWidgets: true, // 防止提示框溢出编辑器
                    ...options
                }
            }
        />
    )
}