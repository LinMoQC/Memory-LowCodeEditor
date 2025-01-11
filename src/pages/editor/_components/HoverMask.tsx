import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponentsStore } from "../stores/componentes";

interface HoverMaskProps {
    containerClassName: string;
    componentId: number;
    portalWrapperClassName: string
}

function HoverMask({ containerClassName,portalWrapperClassName, componentId }: HoverMaskProps) {
    const {components} = useComponentsStore();
    const curComponent = useMemo(() => {
        return getComponentById(componentId,components);
    },[componentId])

    const [position, setPosition] = useState({
        top: 0, 
        left: 0, 
        width: 0, 
        height: 0,
        labelTop: 0,
        labelLeft: 0, 
    });

    useEffect(() => {
        updatePosition();
    }, [componentId])

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

        if(labelTop <= 0){
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

    return createPortal((
        <Fragment>
            <div
            style={{
                position: "absolute",
                left: position.left,
                top: position.top,
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                border: "1px dashed blue",
                pointerEvents: "none",
                width: position.width,
                height: position.height,
                zIndex: 12,
                borderRadius: 4,
                boxSizing: 'border-box',
            }}
        />

        <div 
            style={{
                position: "absolute",
                left: position.labelLeft,
                top: position.labelTop,
                fontSize: '14px',
                zIndex: 13,
                display: (!position.width || position.width < 10) ? 'none' : 'block',
                transform: 'translate(-100%,-100%)',
            }}
        >
            <div
                style={{
                    padding: '0 8px',
                    backgroundColor: 'blue',
                    borderRadius: 4,
                    color: '#fff',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                }}
            >
                {curComponent?.desc}
            </div>
        </div>
        </Fragment>
    ), el)
}

export default HoverMask;