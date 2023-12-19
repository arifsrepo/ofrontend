import React from 'react';
import './Photo.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Photo = (props) => {
    let str = props?.data?.b64;
    const offline = props?.offline;
    const isSwitchOn = props?.isSwitchOn;

    return (
        // <div className="embed">
        <div> 
            <img className="img-fluid single_photo" src={`data:image/png;base64,${str}`}/>
            <br />
            {
                isSwitchOn&&<div className="photo_delete_div_style">
                <p className="photo_name">{props?.data?.name}</p>
            </div>
            }
            {/* <br />
            {
                !offline&&<div className="photo_delete_div_style">
                    <p className="photo_name">{props?.data?.name}</p>
                    <FontAwesomeIcon className="delete_icon_style" icon={faTrash} />
                </div>
            } */}
        </div>
    );
};

export default Photo;