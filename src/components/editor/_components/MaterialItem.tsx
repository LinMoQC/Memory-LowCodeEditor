import { useDrag } from "react-dnd";

export interface MaterialItemProps {
    name: string,
    desc: string
}

export function MaterialItem(props: MaterialItemProps) {

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
            border-dashed
            border-[1px]
            border-[#000]
            py-[8px] px-[10px] 
            m-[10px]
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]
        '
        ref={drag}
    >
        {desc}
    </div>
}
