import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";

function Page({id,name,children,styles}: CommonComponentProps) {
    const {canDrop,drop} = useMaterailDrop(['Button','Container'],id);

    return (
        <div className="p-[20px] h-[100%] box-border"
        data-component-id={id}
        ref={drop} style={{ border: canDrop ? '2px solid blue' : 'none' ,...styles}}>
            {children}
        </div>
    )
}

export default Page