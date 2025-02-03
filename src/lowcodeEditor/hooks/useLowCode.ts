import { useLowCodeStoreContext } from "../context/LowCodeStoreContext.tsx";
import { useStore } from "zustand";

export const useLowCodeStore = () => {
    const store = useLowCodeStoreContext();

    return {
        components: useStore(store, (state) => state.components),  // 订阅组件列表
        curComponentId: useStore(store, (state) => state.curComponentId), // 订阅当前组件 ID
        curComponent: useStore(store, (state) => state.curComponent), // 订阅当前组件
        mode: useStore(store, (state) => state.mode), // 订阅模式

        // 直接使用方法，不用订阅
        setCurComponentId: store.getState().setCurComponentId,
        setMode: store.getState().setMode,
        addComponent: store.getState().addComponent,
        deleteComponent: store.getState().deleteComponent,
        updateComponent: store.getState().updateComponent,
        updateComponentStyles: store.getState().updateComponentStyles,
        getComponentById: store.getState().getComponentById,
    };
};