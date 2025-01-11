import { Fragment, useEffect, useState } from "react"
import { useComponentConfigStore } from "../stores/component-config"
import { Component, getComponentById, useComponentsStore } from "../stores/componentes"
import { Select, TreeSelect } from "antd"

export interface ComponentMethodConfig {
    type: 'componentMethod',
    config: {
        componentId: string,
        method: string
    }
}

export interface ComponentMehodProps {
    value?: ComponentMethodConfig['config']
    onChange?: (config: ComponentMethodConfig) => void
}

export function ComponentMethod(props: ComponentMehodProps) {
    const {value,onChange} = props
    const { components, curComponentId } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore()
    const [selectedComponent, setSelectedComponent] = useState<Component | null>()

    const [curId,setCurId] = useState<string>()
    const [curMethod,setCurMethod] = useState<string>()

    useEffect(() => {
        if(value){
            setCurId(value.componentId)
            setCurMethod(value.method)

            setSelectedComponent(getComponentById(value.componentId,components))
        }
    },[value])

    function componentChange(value: string) {
        if (!curComponentId) return

        setSelectedComponent(getComponentById(value, components))
    }

    function componentMethodChange(value: string) {
        if (!curComponentId || !selectedComponent) return;

        setCurMethod(value);

        onChange?.({
            type: 'componentMethod',
            config: {
                componentId: selectedComponent?.id,
                method: value
            }
        })
    }

    return (
        <div className="mt-[40px] space-y-[20px]">
            {/* 组件选择 */}
            <div className="flex items-center gap-[16px]">
                <div className="w-[80px] text-right text-gray-600">组件：</div>
                <TreeSelect
                    className="flex-1"
                    style={{
                        maxWidth: '500px',
                        height: '45px',
                    }}
                    treeData={components}
                    fieldNames={{
                        label: 'name',
                        value: 'id',
                    }}
                    value={curId}
                    placeholder="请选择组件"
                    onChange={(value) => componentChange(value)}
                />
            </div>
    
            {/* 方法选择 */}
            {componentConfig[selectedComponent?.name || ''] && (
                <div className="flex items-center gap-[16px]">
                    <div className="w-[80px] text-right text-gray-600">方法：</div>
                    <Select
                        className="flex-1"
                        style={{
                            maxWidth: '500px',
                            height: '45px',
                        }}
                        options={componentConfig[selectedComponent?.name || ''].methods?.map((method) => ({
                            label: method.label,
                            value: method.name,
                        }))}
                        value={curMethod}
                        placeholder="请选择方法"
                        onChange={(value) => componentMethodChange(value)}
                    />
                </div>
            )}
        </div>
    );    
}