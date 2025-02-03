import { useStore } from "zustand";
import {useLowCodeConfigStoreContext} from "../context/LowCodeConfigContext.tsx";

export const useLowCodeConfigStore = () => {
    const store = useLowCodeConfigStoreContext();

    return {
        componentConfig: useStore(store, (state) => state.componentConfig),
        registerComponent: store.getState().registerComponent,
    };
};