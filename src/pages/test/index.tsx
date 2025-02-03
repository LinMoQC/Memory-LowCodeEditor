import {LowCodeStoreProvider} from "../../lowcodeEditor/context/LowCodeStoreContext.tsx";
import {LowCodeConfigStoreProvider} from "../../lowcodeEditor/context/LowCodeConfigContext.tsx";
import LowCodeEditor from "../../lowcodeEditor/_components";
import {useLowCodeStore} from "./stores/lowcode-store.ts";
import {useLowCodeConfigStore} from "./stores/lowcode-config-store.ts";

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