import { CommonComponentProps } from "../../pages/editor/interface";


const Container = ({  children, styles }: CommonComponentProps) => {

    return (
        <div
            style={styles}
            className={`p-[20px]`}
        >{children}</div>
    )
}

export default Container;
