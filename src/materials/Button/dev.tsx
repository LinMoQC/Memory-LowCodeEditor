import { Button as AntdButton } from "antd";
import { useDrag } from "react-dnd";
import { CommonComponentProps } from "../../pages/editor/interface";

const Button = ({ id,type, text,styles }: CommonComponentProps) => {
    const [_,darg] = useDrag({
        type: 'Button',
        item: {
            type: 'button',
            dragType: 'move',
            id:id
        }
    })
    return (
        <AntdButton ref={darg} data-component-id={id} type={type} style={styles}>{text}</AntdButton>
    )
}

export default Button