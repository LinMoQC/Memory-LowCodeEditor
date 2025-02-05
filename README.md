# Memory LowCode-Editor

## 🌟 介绍
> Memory LowCode-Editor 是一个基于React + Typescript + Zustand 的低代码编辑器，用于减少重复造轮子（Maybe），目前正在开发中～

## 📚 预览

<div style="text-align: center;">
  <img src="./src/assets/pre.gif" alt="预览"/>
</div>


## ✨ 使用文档

### 安装依赖
``` javascript
npm i @cusmoedge/lowcode-editor
npm i @cusmoedge/lowcode-materials // 物料库
```

### 编写全局Store
``` typescript
// 目前只适配Zustand

// lowcode-store.ts
const creator: StateCreator<LowCodeState & LowCodeAction> = (set, get) => {
    return {
        components: [], // 存储所有组件
        curComponent: null, // 当前选中的组件
        curComponentId: null, // 当前选中组件的 ID
        mode: 'edit', // 编辑器模式

        // 设置编辑模式
        setMode: (mode) => set({ mode }),

        // 设置当前选中的组件 ID
        setCurComponentId: (componentId) => { /* 实现逻辑 */ },

        // 添加新组件
        addComponent: (component, parentId) => { /* 实现逻辑 */ },

        // 删除组件
        deleteComponent: (componentId) => { /* 实现逻辑 */ },

        // 更新组件属性
        updateComponent: (componentId, props) => { /* 实现逻辑 */ },

        // 更新组件样式（支持部分或完全替换）
        updateComponentStyles: (componentId, styles, replace) => { /* 实现逻辑 */ },

        // 根据 ID 查找组件
        getComponentById: (id, components) => { /* 实现逻辑 */ },
    };
};

export const useLowCodeStore = create<LowCodeState & LowCodeAction>()(creator);

// lowcode-config-store.ts
export const useLowCodeConfigStore = create<LowCodeConfigState & LowCodeConfigAction>((set) => ({
    componentConfig: MaterialConfigs, // 默认物料库，可根据文档自定义
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
```

### 🚀 注入全局Store
``` typescript
import {LowCodeStoreProvider} from "@cusmoedge/lowcode-editor";
import {LowCodeConfigStoreProvider} from "@cusmoedge/lowcode-editor";
import {useLowCodeStore} from "./stores/lowcode-store.ts";
import {useLowCodeConfigStore} from "./stores/lowcode-config-store.ts";
import '@cusmoedge/lowcode-editor/index.css' // 引入样式
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
```

# 🎯 特点  

## ⚡️ 高扩展性  
- 采用 **Zustand** 注入全局状态，支持灵活扩展和自定义。  
- **支持物料注册**，开发者可以轻松扩展物料库，新增组件无需改动核心代码。   

## 🎨 拖拽式低代码编辑  
- 提供 **拖拽式 UI 组件布局**，降低开发成本，无需手写 JSX。  
- 可视化搭建页面，支持 **实时预览**。  

## 🔧 高度自定义  
- 组件支持 **属性配置** 和 **事件绑定**，满足各种业务需求。  
- 可扩展 **样式编辑器**，支持动态样式修改。  

## 📦 完整的物料生态  
- **内置基础物料库**，开箱即用（Button、Table、Form 等）。  
- **支持自定义物料**，可根据业务需求灵活拓展。  

## 🔗 易集成  
- 提供 **简洁的 API**，方便接入其他 React 项目。  
- **支持 TypeScript**，类型安全，增强开发体验。  



