import React from "react"
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

    return (
        <div className="h-[100vh] flex flex-col">
            <div className="h-[60px] flex items-center border-b-[1px] border-[#ccc] shadow-lg mb-1">
                <Header />
            </div>

            {
                mode === 'edit' ? <Allotment>
                <Allotment.Pane preferredSize={320} maxSize={320} minSize={320}>
                    <MaterialWrapper />
                </Allotment.Pane>
                <Allotment.Pane>
                    <EditArea />
                </Allotment.Pane>
                <Allotment.Pane preferredSize={300} maxSize={300} minSize={300}>
                    <Setting />
                </Allotment.Pane>
            </Allotment> : <Preview />
            }
        </div>
    )
}

export default Editor