import { Modal, Segmented } from "antd"
import { useState } from "react"
import { GoToLink } from "../actions/GoToLink"
import { ShowMessage } from "../actions/ShowMessage"
import { ComponentEvent } from "../stores/component-config"

interface ActionModalProps {
    visible: boolean
    eventConfig: ComponentEvent
    handleOk: () => void
    handleCancel: () => void
}

export function ActionModal(props: ActionModalProps) {
    const {
        visible,
        handleOk,
        eventConfig,
        handleCancel
    } = props;

    const [key, setKey] = useState<string>('访问链接');

    return  <Modal 
        title="事件动作配置" 
        width={800}
        open={visible}
        okText="添加"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <div className="h-[500px]">
            <Segmented value={key} onChange={setKey} block options={['访问链接', '消息提示', '自定义 JS']} />
            {
                key === '访问链接' && <GoToLink event={eventConfig}/>
            }
            {
                key === '消息提示' && <ShowMessage event={eventConfig}/>
            }
        </div>
    </Modal>
}