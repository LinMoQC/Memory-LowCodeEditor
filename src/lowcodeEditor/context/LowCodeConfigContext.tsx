import React, { createContext, useContext } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';
import {LowCodeConfigAction, LowCodeConfigState} from "../types/LowCodeCofigType.ts";

export type LowCodeConfigStore = UseBoundStore<StoreApi<LowCodeConfigState & LowCodeConfigAction>>;

const LowCodeConfigStoreContext = createContext<LowCodeConfigStore | null>(null);

export const LowCodeConfigStoreProvider: React.FC<{ store: LowCodeConfigStore; children: React.ReactNode }> = ({ store, children }) => {
    return (
        <LowCodeConfigStoreContext.Provider value={store}>
            {children}
        </LowCodeConfigStoreContext.Provider>
    );
};

export function useLowCodeConfigStoreContext(): LowCodeConfigStore {
    const context = useContext(LowCodeConfigStoreContext);
    if (!context) {
        throw new Error('useLowCodeConfigStoreContext 必须在 LowCodeConfigStoreProvider 内部使用');
    }
    return context;
}