import {create} from "zustand/index";
import {LowCodeConfigAction, LowCodeConfigState} from "../../../lowcodeEditor/types/LowCodeCofigType.ts";
import {MaterialConfigs} from "memory-materials";

export const useLowCodeConfigStore = create<LowCodeConfigState & LowCodeConfigAction>((set) => ({
    componentConfig: MaterialConfigs,
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}));