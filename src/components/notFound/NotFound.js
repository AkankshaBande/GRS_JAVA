import React from 'react';
import "./NotFound.css"
const NotfoundPage = () => {
    return (
        <div className="notfound-container">
            <p>The page you are looking for does not exist.</p>
            <img 
                src="/NotFound.jpg" 
                alt="Not Found" 
                className="notfound-image" 
            />
        </div>
    );
};

export default NotfoundPage;
