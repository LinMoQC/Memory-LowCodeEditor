import React, { useMemo, useState } from "react";
import { Table as AntdTable } from 'antd';
import dayjs from "dayjs";
import { CommonComponentProps } from "../../pages/editor/interface";

const TestData = [
    { name: '光光', sex: '男', birthday: new Date('1994-07-07').getTime() },
    { name: '东东', sex: '男', birthday: new Date('1995-06-06').getTime() },
    { name: '小红', sex: '女', birthday: new Date('1996-08-08').getTime() }
]

interface TableColumnProps extends CommonComponentProps {

}

const TableColumn: React.FC<TableColumnProps> = (props) => {

    const {
        children,
    } = props

    // @ts-ignore
    const [data, setData] = useState<Array<Record<string, any>>>(TestData);
    // @ts-ignore
    const [loading, setLoading] = useState(false);

    const columns = useMemo(() => {
        return React.Children.map(children, (item: any) => {
            if (item?.props?.type === 'date') {
                return {
                    title: item.props?.title,
                    dataIndex: item.props?.dataIndex,
                    render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD') : null,
                }
            } else {
                return {
                    title: item.props?.title,
                    dataIndex: item.props?.dataIndex,
                }
            }
        })
    }, [children]);

    return (
        <AntdTable
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
            loading={loading}
        />
    )
}

export default TableColumn