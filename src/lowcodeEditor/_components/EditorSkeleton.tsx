import React from "react";

const EditorSkeleton:React.FC = () => {
    return (
        <div className="w-full mx-auto p-4 bg-transparent mt-10 absolute top-0">
            <div className="animate-pulse flex items-center space-x-4">
                <div className="space-y-3 w-full">
                    <div className="bg-gray-200 h-4 rounded-md w-1/2"></div>
                    <div className="bg-gray-200 h-4 rounded-md w-full"></div>
                    <div className="bg-gray-200 h-4 rounded-md w-full"></div>
                    <div className="bg-gray-200 h-4 rounded-md w-full"></div>
                    <div className="bg-gray-200 h-4 rounded-md w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default EditorSkeleton