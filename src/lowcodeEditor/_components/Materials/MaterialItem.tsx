import { useDrag } from "react-dnd";
import React from "react";

export interface MaterialItemProps {
    name: string,
    desc: string
}

const MaterialItem:React.FC<MaterialItemProps> = (props: MaterialItemProps) => {

    const {
        name,
        desc
    } = props;

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    })

    return <div
        className='
            rounded-md
            border-[1px]
            border-[#ccc]
            w-[122px] h-[40px]
            box-border
            m-[10px]
            cursor-move
            inline-flex
            px-4
            items-center
            bg-white
            font-mono
            text-sm
            hover:bg-[#ccc]
        '
        ref={drag}
    >
        {desc}
    </div>
}

export default MaterialItem;