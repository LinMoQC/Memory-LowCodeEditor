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

const Editor: React.FC<EditorProps> = (props) => {
    const { mode } = useComponentsStore();

    return (
        <div className="h-[100vh] flex flex-col">
            <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">
                <Header />
            </div>

            {
                mode === 'edit' ? <Allotment>
                <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
                    <MaterialWrapper />
                </Allotment.Pane>
                <Allotment.Pane>
                    <EditArea />
                </Allotment.Pane>
                <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
                    <Setting />
                </Allotment.Pane>
            </Allotment> : <Preview />
            }
        </div>
    )
}

export default Editor