import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { Form as AntdForm, DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { CommonComponentProps } from "../../pages/editor/interface";

interface FormItemComponentProps {
    label: string;
    name: string;
    type: "input" | "date";
    rules?: "required" | null;
}

interface FormItemProps extends CommonComponentProps {
    onFinish: (value: Record<string, any>) => void;
    children: React.ReactElement<FormItemComponentProps>[];
}

export interface FormRef {
    submit: () => void;
}

const Form = forwardRef<FormRef, FormItemProps>(({ children, onFinish }, ref) => {
    const [form] = AntdForm.useForm();

    // 提供给父组件的 ref 方法
    useImperativeHandle(ref, () => ({
        submit: form.submit,
    }), [form]);

    // 渲染子组件
    const formItems = useMemo(() => {
        return React.Children.map(children, (item: React.ReactElement<FormItemComponentProps>) => ({
            label: item.props?.label,
            name: item.props?.name,
            type: item.props?.type,
            rules: item.props?.rules,
        })) || [];
    }, [children]);

    const renderFormItem = (item: FormItemComponentProps) => {
        switch (item.type) {
            case "input":
                return <Input />;
            case "date":
                return <DatePicker />;
            default:
                return null;
        }
    };

    // 表单提交处理
    const save = async (values: Record<string, any>) => {
        for (const key in values) {
            if (dayjs.isDayjs(values[key])) {
                values[key] = values[key].format("YYYY-MM-DD");
            }
        }
        onFinish(values);
    };

    // 表单布局
    const formLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    return (
        <AntdForm {...formLayout} form={form} onFinish={save}>
            {formItems.map((item) => (
                <AntdForm.Item
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    rules={
                        item.rules === "required"
                            ? [{ required: true, message: "不能为空" }]
                            : []
                    }
                >
                    {renderFormItem(item)}
                </AntdForm.Item>
            ))}
        </AntdForm>
    );
});

export default Form;
