import { Segmented } from "antd";
import { useState } from "react";
import ComponentAttr from "./ComponentAttr";
import ComponentStyle from "./ComponentStyle";
import ComponentEvent from "./ComponentEvent";
import EmptyStatus from "../EmptyStatus";
import {useLowCodeStore} from "../../hooks/useLowCode.ts";

const Setting: React.FC = () => {
    const { curComponent } = useLowCodeStore();

    const [key, setKey] = useState<string>("属性");
    if (!curComponent) return <EmptyStatus
        description={'您还没有选中物料～'}
        width={200} height={200}
        className="ml-14"
    />

    return (
        <div className="mr-2 ml-2 p-2 rounded-lg shadow-md pb-0 bg-white border-2 h-[calc(100vh-80px)] dark:bg-dark dark:text-dark">
            <Segmented value={key} onChange={setKey} block options={['属性', '样式', '事件']} size='large' />
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