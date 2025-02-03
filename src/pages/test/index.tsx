import {LowCodeStoreProvider} from "@cusmoedge/lowcode-editor";
import {LowCodeConfigStoreProvider} from "@cusmoedge/lowcode-editor";
import {useLowCodeStore} from "./stores/lowcode-store.ts";
import {useLowCodeConfigStore} from "./stores/lowcode-config-store.ts";
// import '@cusmoedge/lowcode-editor/dist/index.css'
import '../../index.css'

import LowCodeEditor from '@cusmoedge/lowcode-editor'

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