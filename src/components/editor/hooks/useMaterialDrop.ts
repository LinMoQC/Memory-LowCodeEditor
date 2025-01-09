import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponentsStore } from "../stores/componentes";
import { message } from "antd";

export function useMaterailDrop(accept: string[],id: number) {
    const {addComponent} = useComponentsStore();
    const {componentConfig} = useComponentConfigStore();

    const [{canDrop}, drop] = useDrop(() => ({
        accept: accept,
        drop: (item: { type: string },monitor) => {
            const props = componentConfig[item.type].defaultProps;
            const didDrop = monitor.didDrop()
            if(didDrop){
                return;
            }

            const config = componentConfig[item.type];

            addComponent({
                id: new Date().getTime(),
                name: item.type,
                props: config.defaultProps,
                desc: config.desc
            },id)

            message.success(`成功拖拽 ${item.type} 到画布`);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    return {canDrop,drop}
}