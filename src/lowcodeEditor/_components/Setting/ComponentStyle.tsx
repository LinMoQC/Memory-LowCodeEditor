import { Form, Input, InputNumber, Select } from "antd"
import React, { useEffect, CSSProperties, useState } from "react"
import { debounce } from "lodash-es"
import StyleToObject from 'style-to-object'
import CssEditor from "../CssEditor"
import {useLowCodeStore} from "../../hooks/useLowCode.ts";
import {useLowCodeConfigStore} from "../../hooks/useLowCodeConfig.ts";
import {LowCodeComponentSetter} from "../../types/LowCodeType.ts";

const ComponentStyle: React.FC = () => {
    const [form] = Form.useForm()
    const [css, setCss] = useState<string>('')

    const { curComponent, curComponentId, updateComponentStyles } = useLowCodeStore()
    const { componentConfig } = useLowCodeConfigStore()

    useEffect(() => {
        form.resetFields()
        const data = form.getFieldsValue()
        form.setFieldsValue({ ...data, ...curComponent?.styles });
        setCss(toCssStr(curComponent?.styles!))
    }, [curComponent])

    if (!curComponent || !curComponentId) return null

    const handleEditorChange = debounce((value) => {
        setCss(value)
        const css: Record<string, any> = {};

        try {
            const cssStr = value.replace(/\/\*.*\*\//, '') // 去掉注释 /** */
                .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
                .replace('}', '');// 去掉 }

            StyleToObject(cssStr, (name, value) => {
                css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
            });

            updateComponentStyles(curComponentId, { ...form.getFieldsValue(), ...css }, true)
        } catch (e) { }
    }, 500)

    function toCssStr(css: Record<string,any>){
        let str = `.comp{\n`
        for(const key in css){
            let value = css[key]
            if(!value){
                continue;
            }

            if(['width','height'].includes(key) && !value.toString().endsWith('px')){
                value += 'px'
            }

            str += `\t${key}: ${value};\n`
        }
        str += '}'
        return str;
    }

    function renderFormElememt(setting: LowCodeComponentSetter) {
        const { type, options } = setting;

        if (type === 'select') {
            return <Select options={options} className="w-[100%]"/>
        } else if (type === 'input') {
            return <Input className="w-[100%]"/>
        } else if (type === 'inputNumber') {
            return <InputNumber className="w-[100%]"/>
        }
    }

    function valueChange(changeValues: CSSProperties) {
        if (curComponentId) {
            updateComponentStyles(curComponentId, changeValues)
        }
    }

    return (
        <Form
            form={form}
            onValuesChange={valueChange}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            style={{ width: '100%' }}
        >
            {
                componentConfig[curComponent.name]?.stylesSetter?.map(setter => (
                    <Form.Item key={setter.name} name={setter.name} label={setter.label}>
                        {renderFormElememt(setter)}
                    </Form.Item>
                ))
            }
            <div className="h-[200px] border-[1px] border-[#ccc]">
                <CssEditor value={css} onChange={handleEditorChange} />
            </div>
        </Form>
    )
}

export default ComponentStyle  