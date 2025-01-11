import { useMemo } from "react"
import { useComponentConfigStore } from "../stores/component-config"
import { MaterialItem } from "./MaterialItem"

const Material: React.FC = () => {
    const {componentConfig} = useComponentConfigStore()

    const componentes = useMemo(() => {
        return Object.values(componentConfig).filter(item => item.name !== 'Page')
    },[componentConfig])

    return (
        <div>
            {componentes.map((component,index) => {
                return (
                    <MaterialItem name={component.name} key={component.name + index} desc={component.desc}/>
                )
            })}
        </div>
    )
}

export default Material
