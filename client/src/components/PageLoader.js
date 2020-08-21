import React from 'react';
import './pageLoader.css';

function PageLoader() {
    return (
        <div className="loaderContainer">
            <div className="loader">
            </div>
            <div className="loadingText">
                Loading...
            </div>
        </div>
    )
}

export default PageLoader
