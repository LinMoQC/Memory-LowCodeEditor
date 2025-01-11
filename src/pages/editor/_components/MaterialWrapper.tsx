import { Segmented } from "antd";
import React, { useState } from "react";
import Outline from "./Outline";
import Source from "./Source";
import Material from "./Material";

const MaterialWrapper:React.FC = () => {
    const [key, setKey] = useState<string>('物料');
    
    return <div className="mr-2 ml-2 mt-2">
        <Segmented value={key} onChange={setKey} block options={['物料', '大纲', '源码']} size="large"/>
        <div className='pt-[20px] h-[calc(100vh-60px-30px-20px)]'>
            {
                key === '物料' && <Material/>
            }
            {
                key === '大纲' && <Outline/>
            }
            {
                key === '源码' && <Source/>
            }
        </div>        
    </div>
}

export default MaterialWrapper