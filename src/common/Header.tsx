import React from "react";
import { Button, Space } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { VscOpenPreview } from "react-icons/vsc";
import { useLowCodeStore } from "../pages/test/stores/lowcode-store";

const Header: React.FC = () => {
    const { mode, setMode, setCurComponentId } = useLowCodeStore();
    return (
        <div className='w-[100%] h-14 border-b-2'>
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
                                setCurComponentId('');
                            }}
                            // type='dashed'
                            variant="filled"
                            color="primary"
                            icon={<VscOpenPreview />}
                        >
                            预览
                        </Button>
                    )}
                    {mode === 'preview' && (
                        <Button
                            onClick={() => { setMode('edit') }}
                            // type='text'
                            variant="filled"
                            color="purple"
                            icon={<FaRegEdit />}
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