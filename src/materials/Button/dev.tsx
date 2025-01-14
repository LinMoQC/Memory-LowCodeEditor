import { Button as AntdButton } from "antd";
import { useDrag } from "react-dnd";
import { CommonComponentProps } from "../../pages/editor/interface";

type ButtonSize = 'small' | 'middle' | 'large'

interface ButtonProps extends CommonComponentProps {
    danger: boolean, 
    size: ButtonSize, 
}

const Button = ({ id,type, text,styles,danger,size }: ButtonProps) => {
    const [_, drag] = useDrag({
        type: 'Button',
        item: {
            type: 'button',
            dragType: 'move', 
            id: id
        },
    });
    
    return (
        <AntdButton ref={drag} data-component-id={id} type={type} style={styles} danger={danger} size={size}>{text}</AntdButton>
    )
}

export default Button