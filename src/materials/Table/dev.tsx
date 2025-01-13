import React, { useEffect, useMemo, useRef } from "react";
import { Table as AntdTable } from 'antd';
import { useDrag } from "react-dnd";
import { useMaterailDrop } from "../../pages/editor/hooks/useMaterialDrop";
import { CommonComponentProps } from "../../pages/editor/interface";

interface TableProps extends CommonComponentProps {

}

const Table:React.FC<TableProps> = (props) => {
    const {
        id, 
        name, 
        children, 
        styles
    } = props

    const {canDrop, drop } = useMaterailDrop(['TableColumn'], id);

    const divRef = useRef<HTMLDivElement>(null);

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: 'move',
            id: id
        }
    });

    useEffect(() => {
        drop(divRef);
        drag(divRef);
    }, []);
    
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
            className={`w-[100%] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[2px] border-[#f0f3f9]'}`}
            ref={divRef}
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