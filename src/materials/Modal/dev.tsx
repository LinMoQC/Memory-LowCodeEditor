import { useMaterailDrop } from "../../pages/editor/hooks/useMaterialDrop";
import { CommonComponentProps } from "../../pages/editor/interface";

function Modal({ id, children, title, styles }: CommonComponentProps) {

    const {canDrop, drop } = useMaterailDrop(['Button', 'Container','Table','Form'], id);

    return (
        <div 
            ref={drop}
            style={styles}
            data-component-id={id}  
            className={`min-h-[100px] p-[20px] border-dashed bg-[rgba(10,19,37,.05)] -mt-[1px]
                ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[2px] border-[#ced0d3]'}`}
        >
            <h4 className="text-[#b8babf]">{title}</h4>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
