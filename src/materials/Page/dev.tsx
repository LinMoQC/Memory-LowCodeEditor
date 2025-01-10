import { useMaterailDrop } from "../../components/editor/hooks/useMaterialDrop";
import { CommonComponentProps } from "../../components/editor/interface";


function Page({id,name,children,styles}: CommonComponentProps) {
    const {canDrop,drop} = useMaterailDrop(['Button','Container','Modal','Table','Form'],id);

    return (
        <div className="p-[20px] h-[100%] box-border"
        data-component-id={id}
        ref={drop} style={{ border: canDrop ? '2px solid blue' : 'none' ,...styles}}>
            {children}
        </div>
    )
}

export default Page