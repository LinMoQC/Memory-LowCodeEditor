import { useComponentsStore } from "../stores/componentes";

const Setting: React.FC = () => {
    const {components} = useComponentsStore();

    return (
        <div className="overflow-auto h-[100%]">
            <pre>
                {JSON.stringify(components,null,2)}
            </pre>
        </div>
    )
}

export default Setting