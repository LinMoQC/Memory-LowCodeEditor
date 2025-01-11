import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { CommonComponentProps } from '../../pages/editor/interface';
import { useMaterailDrop } from '../../pages/editor/hooks/useMaterialDrop';

const Container = ({ id, name, children, styles }: CommonComponentProps) => {
    const { canDrop, drop } = useMaterailDrop(['Button', 'Container','Table','Form'], id);

    const divRef = useRef<HTMLDivElement>(null)
    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: 'move',
            id: id
        }
    })

    useEffect(() => {
        drop(divRef);
        drag(divRef);
    }, []);

    return (
        <div
            ref={divRef}
            data-component-id={id}
            style={{ margin: '10px', ...styles }}
            className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >{children}</div>
    )
}

export default Container;
