import { useMemo } from "react"
import { useComponentConfigStore } from "../stores/component-config"
import { MaterialItem } from "./MaterialItem"

const Material: React.FC = () => {
    const {componentConfig} = useComponentConfigStore()

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

    return (
        <div>
            {unitMaterials.length > 0 && 
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
            {areaMaterials.map((component,index) => {
                return (
                    <MaterialItem name={component.name} key={component.name + index} desc={component.desc}/>
                )
            })}
        </div>
    )
}

export default Material
