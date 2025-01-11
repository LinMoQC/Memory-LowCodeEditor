import React, { Fragment, useEffect, useState } from "react";
import { getComponentById, useComponentsStore } from "../stores/componentes";
import { useComponentConfigStore } from "../stores/component-config";
import type { ComponentEvent } from "../stores/component-config";
import { Button, Collapse, CollapseProps, Empty, message } from "antd";
import { ActionModal, ActionType } from "./ActionModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ComponentEvent: React.FC = () => {
    const { curComponent, updateComponent, components } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [curEvent, setCurEvent] = useState<ComponentEvent>();
    const [curAction, setCurAction] = useState<ActionType>();
    const [curActionIndex, setCurActionIndex] = useState<number>();

    if (!curComponent) return null

    function deleteAction(event: ComponentEvent, index: number) {
        if (!curComponent) return;
        const actions = [...curComponent.props[event.name]?.actions];

        if (index >= 0 && index < actions.length) {
            actions.splice(index, 1);
            updateComponent(curComponent.id, {
                [event.name]: {
                    actions: actions
                }
            });
        } else {
            console.warn('无效的索引:', index);
        }
    }

    function editAction(config: ActionType, index: number) {
        if (!curComponent) {
            return;
        }

        setCurAction(config)
        setCurActionIndex(index)
        setActionModalOpen(true);
    }



    const items: CollapseProps['items'] = (componentConfig[curComponent.name].events || []).map(event => {
        return {
            key: event.name,
            label: <div className='flex justify-between leading-[30px]'>
                {event.label}
                <Button type="primary" onClick={(e) => {
                    // 阻止冒泡
                    e.stopPropagation()
                    setCurEvent(event);
                    setActionModalOpen(true);
                }}>添加动作</Button>
            </div>,
            children: <div>
                {
                    (curComponent.props[event.name]?.actions || []).map((item: ActionType, index: number) => {
                        return <div>
                            {
                                item.type === 'goToLink' ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                    <div className='text-[blue]'>跳转链接</div>
                                    <div>{item.url}</div>
                                    <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }} onClick={() => editAction(item, index)}>
                                        <EditOutlined />
                                    </div>
                                    <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                        onClick={() => deleteAction(event, index)}
                                    ><DeleteOutlined /></div>
                                </div> : null
                            }
                            {
                                item.type === 'showMessage' ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                    <div className='text-[blue]'>消息弹窗</div>
                                    <div>{item.config.type}</div>
                                    <div>{item.config.text}</div>
                                    <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }} onClick={() => editAction(item, index)}>
                                        <EditOutlined />
                                    </div>
                                    <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                        onClick={() => deleteAction(event, index)}
                                    ><DeleteOutlined /></div>
                                </div> : null
                            }
                            {
                                item.type === 'customJS' ? <div key="customJS" className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                    <div className='text-[blue]'>自定义 JS</div>
                                    <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }} onClick={() => editAction(item, index)}>
                                        <EditOutlined />
                                    </div>
                                    <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                        onClick={() => deleteAction(event, index)}
                                    ><DeleteOutlined /></div>
                                </div> : null
                            }
                            {
                                item.type === 'componentMethod' ? <div key="componentMethod" className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                    <div className='text-[blue]'>组件方法</div>
                                    <div>{getComponentById(item.config.componentId, components)?.desc}</div>
                                    <div>{item.config.componentId}</div>
                                    <div>{item.config.method}</div>
                                    <div style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                                        onClick={() => editAction(item, index)}
                                    ><EditOutlined /></div>
                                    <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                        onClick={() => deleteAction(event, index)}
                                    ><DeleteOutlined /></div>
                                </div> : null
                            }
                        </div>
                    })
                }
            </div>
        }
    })

    function handleModalOk(config?: ActionType) {
        if (!config || !curEvent || !curComponent) {
            return;
        }

        if (curAction) {
            updateComponent(curComponent.id, {
                [curEvent.name]: {
                    actions: curComponent.props[curEvent.name]?.actions.map((item: ActionType, index: number) => {
                        return index === curActionIndex ? config : item;
                    })
                }
            })
            message.success('修改成功')
        } else {
            updateComponent(curComponent.id, {
                [curEvent.name]: {
                    actions: [
                        ...(curComponent.props[curEvent.name]?.actions || []),
                        config
                    ]
                }
            })
            message.success('添加成功')
        }

        setCurAction(undefined);

        setActionModalOpen(false)
    }

    return <div className='px-[10px]'>
        {!componentConfig[curComponent.name].events?.length ? <div>
            <Empty description={<span>该组件没有事件～</span>}/>
        </div> : <Fragment>
            <Collapse className='mb-[10px]' items={items} defaultActiveKey={componentConfig[curComponent.name].events?.map(item => item.name)} />
            <ActionModal visible={actionModalOpen} handleOk={handleModalOk} handleCancel={() => {
                setActionModalOpen(false)
            }} action={curAction} />
        </Fragment>}
    </div>
}

export default ComponentEvent