import React from "react";
import { useComponentsStore } from "../stores/componentes";
import { Button, Space } from "antd";

const Header: React.FC = () => {
    const { mode, setMode, setCurComponentId } = useComponentsStore();
    return (
        <div className='w-[100%] h-[100%]'>
            <div className='h-[50px] flex justify-between items-center px-[20px]'>
                <div>Memory Flow -- 仿BliBili Rush低代码平台简易版</div>
                <Space>
                    {mode === 'edit' && (
                        <Button
                            onClick={() => {
                                setMode('preview');
                                setCurComponentId(0);
                            }}
                            type='primary'
                        >
                            预览
                        </Button>
                    )}
                    {mode === 'preview' && (
                        <Button
                            onClick={() => { setMode('edit') }}
                            type='primary'
                        >
                            编辑
                        </Button>
                    )}
                </Space>
            </div>
        </div>
    )
}

export default Header