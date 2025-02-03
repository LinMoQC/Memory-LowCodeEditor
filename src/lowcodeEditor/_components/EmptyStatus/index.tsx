import { Empty } from 'antd'
import './index.css'

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
                src='/empty.png'
                alt="No Data"
                style={{ width: width, height: height }}
            />}
            description={description}
            className={className}
        />
    </div>
}

export default EmptyStatus