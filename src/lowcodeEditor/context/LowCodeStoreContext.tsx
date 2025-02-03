import React, { createContext, useContext } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';
import {LowCodeAction, LowCodeState} from "../types/LowCodeType.ts";

export type LowCodeStore = UseBoundStore<StoreApi<LowCodeState & LowCodeAction>>;

const LowCodeStoreContext = createContext<LowCodeStore | null>(null);

export const LowCodeStoreProvider: React.FC<React.PropsWithChildren<{ store: LowCodeStore }>> = ({ store, children }) => {
    return (
        <LowCodeStoreContext.Provider value={store}>
            {children}
        </LowCodeStoreContext.Provider>
    );
};

export function useLowCodeStoreContext(): LowCodeStore {
    const context = useContext(LowCodeStoreContext);
    if (!context) {
        throw new Error('useLowCodeStoreContext 必须在 LowCodeStoreProvider 内部使用');
    }
    return context;
}