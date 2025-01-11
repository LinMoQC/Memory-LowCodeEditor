import { Modal, Segmented } from "antd"
import { useEffect, useState } from "react"
import { GoToLink, GoToLinkConfig } from "../actions/GoToLink"
import { ShowMessage, ShowMessageConfig } from "../actions/ShowMessage"
import { CustomJS, CustomJSConfig } from "../actions/CustomJS"
import { ComponentMethod, ComponentMethodConfig } from "../actions/ComponentMethod"

export interface ActionModalProps {
    visible: boolean
    handleOk: (config?: ActionType) => void
    handleCancel: () => void
    action?: ActionType,
}

export type ActionType = GoToLinkConfig | ShowMessageConfig | CustomJSConfig | ComponentMethodConfig

export function ActionModal(props: ActionModalProps) {
    const {
        visible,
        handleOk,
        action,
        handleCancel
    } = props;

    const [key, setKey] = useState<string>('访问链接');
    const [curConfig,setCurConfig] = useState<ActionType>();

    const map = {
        goToLink: '访问链接',
        showMessage: "消息提示",
        customJS: '自定义 JS',
        componentMethod: '组件方法'
    }

    useEffect(() => {
        if(action?.type){
            setKey(map[action.type])
        }
    },[action])

    return  <Modal 
        title="事件动作配置" 
        width={800}
        open={visible}
        okText="添加"
        cancelText="取消"
        onOk={() => handleOk(curConfig)}
        onCancel={handleCancel}
    >
        <div className="h-[500px]">
            <Segmented value={key} onChange={setKey} block options={['访问链接', '消息提示', '组件方法','自定义 JS']} />
            {
                key === '访问链接' && <GoToLink onChange={(config) => {
                    setCurConfig(config)
                }} value={action?.type === 'goToLink' ? action.url : ''}/>
            }
            {
                key === '消息提示' && <ShowMessage onChange={(config) => {
                    setCurConfig(config)
                }} value={action?.type === 'showMessage' ? action.config : undefined}/>
            }
            {
                key === '组件方法' && <ComponentMethod onChange={(config) => {
                    setCurConfig(config)
                }} />
            }
            {
                key === '自定义 JS' && <CustomJS onChange={(config) => {
                    setCurConfig(config)
                }} value={action?.type === 'customJS' ? action.code : ''}/>
            }
        </div>
    </Modal>
}