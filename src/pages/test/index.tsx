import { renderComponents } from 'memory-library';
import { Component } from '../editor/stores/componentes'
import { useRef } from 'react';

export default function Test() {
    const components: Component[] = [
        {
            "id": "FlexContainer_1737000369196",
            "name": "FlexContainer",
            "props": {},
            "desc": "弹性容器",
            "parentId": "root",
            "children": [
                {
                    "id": "FlexItem_1737000370828",
                    "name": "FlexItem",
                    "props": {
                        "flexRatio": 1
                    },
                    "desc": "弹性容器项",
                    "parentId": "FlexContainer_1737000369196",
                    "children": [
                        {
                            "id": "Form_1737000376678",
                            "name": "Form",
                            "props": {},
                            "desc": "表单",
                            "parentId": "FlexItem_1737000370828"
                        }
                    ]
                },
                {
                    "id": "FlexItem_1737000372193",
                    "name": "FlexItem",
                    "props": {
                        "flexRatio": 1
                    },
                    "desc": "弹性容器项",
                    "parentId": "FlexContainer_1737000369196",
                    "children": [
                        {
                            "id": "Table_1737000579106",
                            "name": "Table",
                            "props": {},
                            "desc": "表格",
                            "parentId": "FlexItem_1737000372193",
                            "children": [
                                {
                                    "id": "TableColumn_1737000583055",
                                    "name": "TableColumn",
                                    "props": {
                                        "dataIndex": "test",
                                        "title": "test",
                                        "type": "text"
                                    },
                                    "desc": "表格列",
                                    "parentId": "Table_1737000579106"
                                },
                                {
                                    "id": "TableColumn_1737000584505",
                                    "name": "TableColumn",
                                    "props": {
                                        "dataIndex": "col_1737000460087",
                                        "title": "列名"
                                    },
                                    "desc": "表格列",
                                    "parentId": "Table_1737000579106"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "FlexItem_1737000374310",
                    "name": "FlexItem",
                    "props": {
                        "flexRatio": 1
                    },
                    "desc": "弹性容器项",
                    "parentId": "FlexContainer_1737000369196",
                    "children": [
                        {
                            "id": "Form_1737000379426",
                            "name": "Form",
                            "props": {},
                            "desc": "表单",
                            "parentId": "FlexItem_1737000374310"
                        }
                    ]
                }
            ]
        }
    ]
    const componentRefs = useRef<Record<string, any>>({});

    return (
        <div>
            {renderComponents(components,componentRefs)}
        </div>
    )
}