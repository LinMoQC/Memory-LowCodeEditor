import { Segmented } from "antd";
import { useComponentsStore } from "../stores/componentes";
import { useState } from "react";
import ComponentAttr from "./ComponentAttr";
import ComponentEvent from "./ComponentEvent";
import ComponentStyle from "./ComponentStyle";
import EmptyStatus from "../../../common/empty";

const Setting: React.FC = () => {
    const {curComponent} = useComponentsStore();

    const [key, setKey] = useState<string>("属性");
    if(!curComponent) return <EmptyStatus 
    description={'您还没有选中物料～'} 
    width={200} height={200} 
    className="ml-14"
    />

    return (
        <div className="ml-2 mr-2 mt-2">
            <Segmented value={key} onChange={setKey} block options={['属性','样式','事件']} size='large' />
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