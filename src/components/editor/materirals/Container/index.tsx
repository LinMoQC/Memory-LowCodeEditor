import { useMaterailDrop } from '../../hooks/useMaterialDrop';
import { CommonComponentProps } from '../../interface';

const Container = ({ id, children,styles }: CommonComponentProps) => {
    const {canDrop,drop} = useMaterailDrop(['Button','Container'],id);

    return (
        <div
            ref={drop}
            data-component-id={id}
            style={{margin: '10px',...styles}}
            className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >{children}</div>
    )
}

export default Container;
