import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../../pages/editor/interface';

const Button = ({ id, type, text, styles,...props }: CommonComponentProps) => {
    return (
        <AntdButton type={type} style={styles} {...props}>{text}</AntdButton>
    )
}

export default Button;
