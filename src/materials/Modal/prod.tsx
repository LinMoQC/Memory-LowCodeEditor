import { useImperativeHandle, useState, forwardRef } from "react";
import { Modal as AntdModal } from 'antd';
import { CommonComponentProps } from "../../pages/editor/interface";

export interface ModalRef {
    open: () => void;
    close: () => void;
}

// 使用 forwardRef 包装 Modal 组件
const Modal = forwardRef<ModalRef, CommonComponentProps>(({ children, title, onOk, onCancel, styles }, ref) => {
    const [open, setOpen] = useState(false); // 默认状态为关闭

    useImperativeHandle(ref, () => ({
        open: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        }
    }), []);

    return (
        <AntdModal
            title={title}
            style={styles}
            open={open}
            onCancel={() => {
                onCancel && onCancel();
                setOpen(false);
            }}
            onOk={() => {
                onOk && onOk();
            }}
            destroyOnClose
        >
            {children}
        </AntdModal>
    );
});

export default Modal;
