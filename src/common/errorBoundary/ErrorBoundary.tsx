import React, { Component, ReactNode } from "react";

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
                <div className="error-boundary">
                    <h1>出错了</h1>
                    <p>{this.state.message}</p>
                    <button onClick={() => this.setState({ hasError: false })}>
                        重试
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
