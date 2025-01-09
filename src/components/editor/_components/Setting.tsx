import { Segmented } from "antd";
import { useComponentsStore } from "../stores/componentes";
import { useState } from "react";
import ComponentAttr from "./ComponentAttr";
import ComponentEvent from "./ComponentEvent";
import ComponentStyle from "./ComponentStyle";

const Setting: React.FC = () => {
    const {curComponent} = useComponentsStore();

    const [key, setKey] = useState<string>("属性");
    if(!curComponent) return null

    return (
        <div>
            <Segmented value={key} onChange={setKey} block options={['属性','样式','事件']}/>
            <div className="pt-10">
                {
                    key === '属性' && <ComponentAttr />
                }
                {
                    key === '样式' && <ComponentStyle />
                }
                {
                    key === '事件' && <ComponentEvent />
                }
            </div>
        </div>
    )
}

export default Setting