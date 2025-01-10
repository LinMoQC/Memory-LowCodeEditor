import FormItemDev from "./dev";
import FormItemProd from "./prod";

export const FormItemConfig = {
    name: 'FormItem',
    desc: '表单项',
    defaultProps: {
        name: new Date().getTime(),
        label: '姓名'
    },
    dev: FormItemDev,
    prod: FormItemProd,
    setter: [
        {
            name: 'type',
            label: '类型',
            type: 'select',
            options: [
                {
                    label: '文本',
                    value: 'input',
                },
                {
                    label: '日期',
                    value: 'date',
                },
            ],
        },
        {
            name: 'label',
            label: '标题',
            type: 'input',
        },
        {
            name: 'name',
            label: '字段',
            type: 'input',
        },
        {
            name: 'rules',
            label: '校验',
            type: 'select',
            options: [
                {
                    label: '必填',
                    value: 'required',
                },
            ],
        }
    ]
}