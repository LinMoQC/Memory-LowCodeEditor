import React, { Fragment, useEffect, useMemo, useState } from "react";
import { getComponentById, useComponentsStore } from "../stores/componentes";
import { createPortal } from "react-dom";
import { Dropdown, message, Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface SelectedMaskProps {
    portalWrapperClassName: string
    containerClassName: string
    componentId: string;
}

const SelectedMask: React.FC<SelectedMaskProps> = (props) => {
    const { containerClassName, portalWrapperClassName, componentId } = props
    const { curComponentId, components, deleteComponent, setCurComponentId} = useComponentsStore();

    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0,
    });

    useEffect(() => {
        setTimeout(() => {
            updatePosition();
        },200)
    }, [componentId, components])

    // ResizeObserver监听页面尺寸变化
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            setTimeout(() => {
                updatePosition();
            }, 100);
        });

        const targetElement = document.getElementById('edit-area');
        if (targetElement) {
            resizeObserver.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                resizeObserver.unobserve(targetElement);
            }
            resizeObserver.disconnect();
        };
    }, []);

    function updatePosition() {
        if (!componentId) {
            return;
        }

        const container = document.querySelector(`.${containerClassName}`);
        if (!container) return;

        const node = document.querySelector(`[data-component-id="${componentId}"]`);
        if (!node) return;

        const { top, left, width, height } = node.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

        let labelTop = top - containerTop + container.scrollTop;
        let labelLeft = left - containerLeft + width;

        if (labelTop <= 0) {
            labelTop += 20;
        }

        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollTop,
            width,
            height,
            labelLeft,
            labelTop
        });
    }

    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`)!;
    }, [])

    const curComponent = useMemo(() => {
        return getComponentById(componentId, components);
    }, [componentId])

    const parentComponents = useMemo(() => {
        const parentComponents = []
        let component = curComponent

        while (component?.parentId) {
            component = getComponentById(component.parentId, components);
            if (component) {
                parentComponents.push(component);
            }
        }
        return parentComponents;
    }, [curComponent])

    function handleDelete() {
        deleteComponent(curComponentId!);
        setCurComponentId('');
        message.success('删除成功');
    }
    return createPortal((
        <Fragment>
            <div style={{
                position: "absolute",
                left: position.left,
                top: position.top,
                backgroundColor: "rgba(0,0,255,0.1)",
                border: "1px dashed blue",
                pointerEvents: "none",
                width: position.width,
                height: position.height,
                zIndex: 12,
                borderRadius: 4,
                boxSizing: 'border-box',
            }} />

            <div style={{
                position: "absolute",
                left: position.labelLeft,
                top: position.labelTop,
                fontSize: '14px',
                zIndex: 13,
                display: (!position.width || position.width < 10) ? 'none' : 'inline',
                transform: 'translate(-100%,-100%)',
            }}>
                <Space>
                    <Dropdown
                        menu={{
                            items: parentComponents.map((component) => ({
                                key: component.id,
                                label: component.desc
                            }))
                        }}
                        disabled={parentComponents.length === 0}
                    >

                    </Dropdown>
                    <div style={{
                        padding: '0 8px',
                        backgroundColor: 'blue',
                        borderRadius: 4,
                        color: '#fff',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}>
                        {curComponent?.desc}
                    </div>
                    {curComponentId !== 'root' && (
                        <div style={{
                            padding: '0 8px',
                            backgroundColor: 'blue',
                        }}>
                            <Popconfirm
                                title="确认删除？"
                                okText="确认"
                                cancelText="取消"
                                onConfirm={handleDelete}
                            >
                                <DeleteOutlined style={{ color: '#fff', cursor: 'pointer' }} />
                            </Popconfirm>
                        </div>
                    )}
                </Space>
            </div>
        </Fragment>
    ), el)
}

export default SelectedMask