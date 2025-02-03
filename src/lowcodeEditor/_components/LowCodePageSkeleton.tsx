import React from "react";

const LowCodePageSkeleton: React.FC = () => {
    return (
        <div className="w-full mx-auto bg-transparent absolute">
            <div className="animate-pulse flex flex-row items-center space-x-4">
                <div className="bg-gray-200 h-[calc(100vh-90px)] w-[320px] rounded-md"></div>
                <div className="bg-gray-200 h-[calc(100vh-90px)] w-[54%] rounded-md"></div>
                <div className="bg-gray-200 h-[calc(100vh-90px)] w-[300px] rounded-md"></div>
            </div>
        </div>
    )
}

export default LowCodePageSkeleton