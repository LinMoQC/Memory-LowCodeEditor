import React, {Suspense} from "react";
import { Allotment } from "allotment";
import 'allotment/dist/style.css';
import LowCodePageSkeleton from "./LowCodePageSkeleton.tsx";
import MaterialWrapper from "./Materials/MaterialWrapper.tsx";
import EditArea from "./EditorArea/EditArea.tsx";
import Setting from "./Setting/Setting.tsx";
import Preview from "./Preview.tsx";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {useLowCodeStore} from "../hooks/useLowCode.ts";
import '../index.css'

export interface LowCodeEditorProps {
    name?: string;
}

const LowCodeEditor: React.FC<LowCodeEditorProps> = () => {
    const {mode} = useLowCodeStore()
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="h-full flex flex-col">
                <div style={{ display: mode === 'edit' ? 'block' : 'none', height: '100%' }}>
                    <Suspense fallback={<LowCodePageSkeleton />}>
                        <Allotment separator={false}>
                            <Allotment.Pane preferredSize={320} maxSize={320} minSize={320} >
                                <MaterialWrapper />
                            </Allotment.Pane>
                            <Allotment.Pane>
                                <EditArea />
                            </Allotment.Pane>
                            <Allotment.Pane preferredSize={300} maxSize={300} minSize={300}>
                                <Setting />
                            </Allotment.Pane>
                        </Allotment>
                    </Suspense>
                </div>

                <div style={{ display: mode === 'preview' ? 'block' : 'none', height: '100%' }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Preview />
                    </Suspense>
                </div>
            </div>
        </DndProvider>
    );
}

export default LowCodeEditor;


