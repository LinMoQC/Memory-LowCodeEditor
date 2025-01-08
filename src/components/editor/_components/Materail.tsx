import { useMemo } from "react"
import { useComponentConfigStore } from "../stores/component-config"
import { MaterialItem } from "./MaterialItem"

const Materail: React.FC = () => {
    const {componentConfig} = useComponentConfigStore()

    const componentes = useMemo(() => {
        return Object.values(componentConfig)
    },[componentConfig])

    return (
        <div>
            {componentes.map((component,index) => {
                return (
                    <MaterialItem name={component.name} key={component.name + index} />
                )
            })}
        </div>
    )
}

export default Materail