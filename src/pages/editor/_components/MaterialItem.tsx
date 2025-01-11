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
            rounded-md
            border-[1px]
            border-[#ccc]
            w-[130px] h-[40px]
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
