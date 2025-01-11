import { Handle, Position } from '@xyflow/react';

export interface OscillatorNodeProps {
    id: string
    data: {
        frequency: number
        type: string
    }
}

export function OscillatorNode({ id, data }: OscillatorNodeProps) {
    return (
        <div className={'bg-white shadow-xl'}>
            <p className={'rounded-t-md p-[8px] bg-pink-500 text-white'}>振荡器节点</p>
            <div className={'flex flex-col p-[8px]'}>
                <span>频率</span>
                <input
                    type="range"
                    min="10"
                    max="1000"
                    value={data.frequency}
                />
                <span className={'text-right'}>{data.frequency}赫兹</span>
            </div>
            <hr className={'mx-[4px]'} />
            <div className={'flex flex-col p-[8px]'}>
                <p>波形</p>
                <select value={data.type}>
                    <option value="sine">正弦波</option>
                    <option value="triangle">三角波</option>
                    <option value="sawtooth">锯齿波</option>
                    <option value="square">方波</option>
                </select>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};
