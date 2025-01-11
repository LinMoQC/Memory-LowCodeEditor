import React from "react";
import { useComponentsStore } from "../stores/componentes";
import { Tree } from "antd";

const Outline:React.FC = () => {
    const {components,setCurComponentId} = useComponentsStore()
    return (
        <Tree 
        fieldNames={{ title: 'desc', key: 'id' }}
        treeData={components as any}
        showLine
        defaultExpandAll
        onSelect={([selectedKey]) => {
            setCurComponentId(selectedKey as string);
        }}
        />
    )
}

export default Outline