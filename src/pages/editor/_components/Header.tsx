import React from "react";
import { useComponentsStore } from "../stores/componentes";
import { Button, Space } from "antd";

const Header: React.FC = () => {
    const { mode, setMode, setCurComponentId } = useComponentsStore();
    return (
        <div className='w-[100%] h-[100%]'>
            <div className='h-[100%] flex justify-between items-center px-[20px]'>
                <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 
                    tracking-wider leading-tight italic'>
                    Memory Flow
                </h2>
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