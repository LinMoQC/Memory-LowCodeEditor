import React, { useEffect } from "react"
import { Allotment } from "allotment"
import 'allotment/dist/style.css';
import Header from "./_components/Header";
import EditArea from "./_components/EditArea";
import Setting from "./_components/Setting";
import MaterialWrapper from "./_components/MaterialWrapper";
import { useComponentsStore } from "./stores/componentes";
import Preview from "./_components/Preview";

interface EditorProps {

}

const Editor: React.FC<EditorProps> = () => {
    const { mode } = useComponentsStore();

    // useEffect(() => {
    //     throw new Error
    // }, [])

    return (
        <div className="h-[100vh] flex flex-col">
            <div className="h-[60px] flex items-center border-b-[1px] border-[#ccc] shadow-lg mb-1">
                <Header />
            </div>

            <div style={{ display: mode === 'edit' ? 'block' : 'none', height: '100%' }}>
                <Allotment>
                    <Allotment.Pane preferredSize={320} maxSize={320} minSize={320}>
                        <MaterialWrapper />
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <EditArea />
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={300} maxSize={300} minSize={300}>
                        <Setting />
                    </Allotment.Pane>
                </Allotment>
            </div>

            <div style={{ display: mode === 'preview' ? 'block' : 'none', height: '100%' }}>
                <Preview />
            </div>
        </div>
    )
}

export default Editor