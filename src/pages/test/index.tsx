import LowCodeEditor, { LowCodeConfigStoreProvider, LowCodeStoreProvider } from "../../lowcodeEditor";
import { useLowCodeConfigStore } from "./stores/lowcode-config-store";
import { useLowCodeStore } from "./stores/lowcode-store";

export default function Test() {
    return (
        <div className='h-[100vh] w-full p-5'>
            <LowCodeStoreProvider store={useLowCodeStore}>
                <LowCodeConfigStoreProvider store={useLowCodeConfigStore}>
                    <LowCodeEditor />
                </LowCodeConfigStoreProvider>
            </LowCodeStoreProvider>
        </div>
    )
}