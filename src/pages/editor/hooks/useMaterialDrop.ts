import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { getComponentById, useComponentsStore } from "../stores/componentes";
import { message } from "antd";

export interface ItemType {
    type: string;
    dragType?: 'move' | 'add',
    id: number
}

export function useMaterailDrop(accept: string[], id: number) {
    const { addComponent, deleteComponent, components } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: accept,
        drop: (item: ItemType, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return;
            }

            if (item.dragType === 'move') {
                const component = getComponentById(item.id, components)!;
                deleteComponent(item.id);
                addComponent(component, id)
            } else {
                const config = componentConfig[item.type];

                addComponent({
                    id: new Date().getTime(),
                    name: item.type,
                    props: config.defaultProps,
                    desc: config.desc,
                }, id)

                message.success(`成功拖拽 ${item.type} 到画布`);
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    return { canDrop, drop }
}