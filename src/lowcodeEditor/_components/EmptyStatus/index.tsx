import { Empty } from 'antd'
import './index.css'
import React from 'react'

interface EmptyStatusProps {
    width: number
    height: number
    description: string
    className?: string
}

const EmptyStatus: React.FC<EmptyStatusProps> = (props) => {
    const {width,height,description,className} = props
    return <div className='memoryEmpty'>
        <Empty
            image={<img
                src='https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/img/empty.png'
                alt="No Data"
                style={{ width: width, height: height }}
            />}
            description={description}
            className={className}
        />
    </div>
}

export default EmptyStatus