import React from 'react';
import './Photo.css';

const Photo = (props) => {
    let str = props?.data?.b64;
    
    return (
        // <div className="embed">
        <div> 
            <img className="img-fluid single_photo" src={`data:image/png;base64,${str}`}/>
            <br />
        </div>
    );
};

export default Photo;