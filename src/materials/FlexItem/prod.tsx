import React from "react";
import { CommonComponentProps } from "../../pages/editor/interface";


interface FlexItemProps extends CommonComponentProps {
    flexRatio: number
}

const FlexItem: React.FC<FlexItemProps> = (props) => {
    const { children, styles,flexRatio } = props
    return (
        <div
            style={{ ...styles,flex: `${flexRatio}`}}
            className={
                `min-h-[200px] p-[20px] relative`
            }
        >
            {children}
        </div>
    );
};

export default FlexItem;
