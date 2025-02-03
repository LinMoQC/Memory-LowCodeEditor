import React from "react";

import { Tree } from "antd";
import {useLowCodeStore} from "../../hooks/useLowCode.ts";

const Outline:React.FC = () => {
    const {components,setCurComponentId} = useLowCodeStore()
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