const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen text-red-400 text-center">
            <div className="relative mb-28">
                <h1 className="text-2xl font-bold absolute bottom-0 left-1/2 translate-x-[-50%]">404 Not Found</h1>
                <img src="/error.png" alt="Error" width={500} height={500} className="mt-4 max-w-full h-auto" />
            </div>
            {/* <button onClick={() => this.setState({ hasError: false })} className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
                        重试
                    </button> */}
        </div>
    )
}

export default NotFound