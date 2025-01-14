import React, { Component, ReactNode } from "react";
import errorGirl from '../../assets/error.png'

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    message: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            message: ''
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, message: error.message };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught in ErrorBoundary: ", error, errorInfo);
        // 可以在这里发送错误信息到监控服务
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col justify-center items-center h-screen w-screen text-red-400 text-center">
                    <div className="relative mb-28">
                        <h1 className="text-2xl font-bold absolute bottom-0 left-1/2 translate-x-[-50%]">好像...出错了呢</h1>
                        <p className="mt-2">{this.state.message}</p>
                        <img src="/error.png" alt="Error" width={500} height={500} className="mt-4 max-w-full h-auto" />
                    </div>
                    {/* <button onClick={() => this.setState({ hasError: false })} className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
                        重试
                    </button> */}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
