import React, { useMemo } from "react";
import { Table as AntdTable } from 'antd';
import { CommonComponentProps } from "../../pages/editor/interface";


interface TableProps extends CommonComponentProps {

}

const Table:React.FC<TableProps> = (props) => {
    const {
        id, 
        children, 
        styles
    } = props
    
    const columns = useMemo(() => {
        return React.Children.map(children, (item: any) => {
            return {
                title: <div className='m-[-16px] p-[16px]' data-component-id={item.props?.id}>{item.props?.title}</div>,
                dataIndex: item.props?.dataIndex,
                key: item
            }
        })
    }, [children]);

    return (
        <div
            className={`w-[100%]`}
            data-component-id={id}
            style={styles}
        >
            <div className='w-[100%] h-10 border-b-[1px] bg-[#f7f8fa] p-2'>
            <span className='font-light text-sm'>表格</span>
        </div>
            <AntdTable
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </div>
    );
}

export default Table