import { Form, Input, Select, Slider, Switch } from "antd";
import React, { useEffect } from "react";
import { ComponentSetter, useComponentsStore } from "../stores/componentes";
import { ComponentConfig, useComponentConfigStore } from "../stores/component-config";

const ComponentAttr: React.FC = () => {
    const [form] = Form.useForm();
    const { curComponentId, curComponent, updateComponent } = useComponentsStore();
    const { componentConfig } = useComponentConfigStore();

    useEffect(() => {
        const data = form.getFieldsValue();
        form.setFieldsValue({ ...data, ...curComponent?.props });
    }, [curComponent])

    if (!curComponent || !curComponentId) return null;

    function renderFormElememt(setting: ComponentSetter) {
        const { type, options } = setting;

        if (type === 'select') {
            return <Select options={options} />
        } else if (type === 'input') {
            return <Input />
        } else if (type === 'slider') {
            return <Slider min={0} max={10}/>
        } else if (type === 'switch'){
            return <Switch />
        }
    }

    function valueChange(changeValues: ComponentConfig) {
        if (curComponentId) {
            updateComponent(curComponentId, changeValues);
        }
    }

    return (
        <Form
            form={form}
            onValuesChange={valueChange}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
        >
            <Form.Item label="组件id">
                <Input value={curComponent.id} disabled />
            </Form.Item>
            <Form.Item label="组件名称">
                <Input value={curComponent.name} disabled />
            </Form.Item>
            <Form.Item label="组件描述">
                <Input value={curComponent.desc} disabled />
            </Form.Item>
            {
                componentConfig[curComponent.name]?.setter?.map(setter => (
                    <Form.Item key={setter.name} name={setter.name} label={setter.label}>
                        {renderFormElememt(setter)}
                    </Form.Item>
                ))
            }
        </Form>
    )
}

export default ComponentAttr