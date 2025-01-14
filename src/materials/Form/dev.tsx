import { Form as AntdForm } from 'antd';
import { useDrag } from 'react-dnd';
import { useEffect, useMemo, useRef } from 'react';
import React from 'react';
import { CommonComponentProps } from '../../pages/editor/interface';
import { useMaterailDrop } from '../../pages/editor/hooks/useMaterialDrop';
import FormItem from '../FormItem/dev';

interface FormProps extends CommonComponentProps {
    onFinish: (values: any) => void
}

const Form: React.FC<FormProps> = (props) => {
    const {
        id,
        name,
        children,
        onFinish
    } = props

    const [form] = AntdForm.useForm();
    const { canDrop, drop } = useMaterailDrop(['FormItem'], id);

    const divRef = useRef<HTMLDivElement>(null);

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: 'move',
            id: id,
        }
    });

    useEffect(() => {
        drop(divRef);
        drag(divRef);
    }, []);

    const formItems = useMemo(() => {
        return React.Children.map(children, (item: any) => {
            return {
                label: item.props?.label,
                name: item.props?.name,
                type: item.props?.type,
                id: item.props?.id,
            }
        });
    }, [children]);

    return <div
        className={`
            w-[100%] min-h-[100px] rounded-[4px]
            ${canDrop ? 'border-[2px] border-[blue]' : 'border-[2px] border-solid border-[#e8e9eb]'}
            `}
        ref={divRef}
        data-component-id={id}
    >
        <div className='w-[100%] h-10 border-b-[2px] bg-[#f7f8fa] p-2'>
            <span className='font-light text-sm'>表单</span>
        </div>
        <div className='w-[100%] p-4'>
            <AntdForm labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} form={form} onFinish={(values) => {
                onFinish && onFinish(values)
            }}>
                {formItems.map((item: any) => {
                    return <FormItem 
                        label={item.label} 
                        key={item.name}
                        id={item.id}
                        name={item.name} />
                })}
            </AntdForm>
        </div>
    </div>
}

export default Form