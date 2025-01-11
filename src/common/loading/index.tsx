import React from "react";
import './index.css'

const Loading: React.FC = () => {
    return (
        <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </section>
    )
}

export default Loading;