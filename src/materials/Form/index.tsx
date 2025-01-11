import { ComponentConfig } from "../../pages/editor/stores/component-config";
import FormDev from "./dev";

export const FormConfig: ComponentConfig = {
    name: 'Form',
    defaultProps: {},
    desc: '表单',
    setter: [
        {
            name: 'title',
            label: '标题',
            type: 'input',
        },
    ],
    events: [
        {
            name: 'onFinish',
            label: '提交事件',
        }
    ],
    dev: FormDev,
    prod: FormDev
}