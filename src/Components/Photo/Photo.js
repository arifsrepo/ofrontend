import React from 'react';
import './Photo.css';

const Photo = (props) => {
    const { myFile } = props.data;
    return (
        <div className="single_photo">
            <img className=" img-fluid" src={`${myFile}`} />
        </div>
    );
};

export default Photo;