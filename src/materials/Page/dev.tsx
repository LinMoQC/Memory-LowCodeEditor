import { useMaterailDrop } from "../../pages/editor/hooks/useMaterialDrop";
import { CommonComponentProps } from "../../pages/editor/interface";


function Page({id,children,styles}: CommonComponentProps) {
    const {canDrop,drop} = useMaterailDrop(['Button','Container','Modal','Table','Form','FlexContainer'],id);

    return (
        <div className="p-[20px] h-[100%] box-border"
        data-component-id={id}
        ref={drop} style={{ border: canDrop ? '2px solid blue' : 'none' ,...styles}}>
            {children}
        </div>
    )
}

export default Page