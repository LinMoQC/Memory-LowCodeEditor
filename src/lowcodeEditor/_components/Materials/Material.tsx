import React, { useMemo } from "react"

import {useLowCodeConfigStore} from "../../hooks/useLowCodeConfig.ts";
import MaterialItem from "./MaterialItem.tsx";

const Material: React.FC = () => {
    const {componentConfig} = useLowCodeConfigStore()

    const componentes = useMemo(() => {
        return Object.values(componentConfig).filter(item => item.name !== 'Page')
    },[componentConfig])

    // 单元物料
    const unitMaterials = useMemo(() => {
        return componentes.filter(item => item.materialType === 'unit')
    },[componentes])

    // 区域物料
    const areaMaterials = useMemo(() => {
        return componentes.filter(item => item.materialType === 'area')
    },[componentes])

    // 区域物料
    const specialMaterials = useMemo(() => {
        return componentes.filter(item => item.materialType === 'special')
    },[componentes])

    return (
        <div>
            {unitMaterials.length > 0 && unitMaterials.length > 0 && 
                <h3 className="ml-4 font-bold">单元物料</h3>
            }
            {unitMaterials.map((component,index) => {
                return (
                    <MaterialItem name={component.name} key={component.name + index} desc={component.desc}/>
                )
            })}
            {areaMaterials.length > 0 && 
                <h3 className="ml-4 font-bold">区域物料</h3>
            }
            {areaMaterials.length > 0 && areaMaterials.map((component,index) => {
                return (
                    <MaterialItem name={component.name} key={component.name + index} desc={component.desc}/>
                )
            })}
            {specialMaterials.length > 0 && 
                <h3 className="ml-4 font-bold">特殊区域物料</h3>
            }
            {specialMaterials.length >0 && specialMaterials.map((component,index) => {
                return (
                    <MaterialItem name={component.name} key={component.name + index} desc={component.desc}/>
                )
            })}
        </div>
    )
}

export default Material
