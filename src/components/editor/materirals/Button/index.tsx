import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";

const Button = ({ id,type, text }: CommonComponentProps) => {
    return (
        <AntdButton data-component-id={id} type={type} style={{marginRight: '10px'}}>{text}</AntdButton>
    )
}

export default Button