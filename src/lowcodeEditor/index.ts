import LowCodeEditor from './_components/index.tsx'
import type LowCodeEditorProps from './_components/index.tsx'
import './index.css'

export { LowCodeEditor, LowCodeEditorProps }

export default LowCodeEditor

// provider
import { LowCodeConfigStoreProvider } from './context/LowCodeConfigContext.tsx'
import { LowCodeStoreProvider } from './context/LowCodeStoreContext.tsx'

export { LowCodeStoreProvider, LowCodeConfigStoreProvider }

// type导入
import { LowCodeState, LowCodeAction, LowCodeComponent } from './types/LowCodeType.ts'
import { LowCodeConfigState, LowCodeConfigAction } from './types/LowCodeCofigType.ts'

export type { LowCodeState, LowCodeAction, LowCodeComponent, LowCodeConfigState, LowCodeConfigAction }