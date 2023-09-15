import React from 'react';
import './Note.css';

const Note = props => {
    let text = '';
    let date = '';
    
    try {
        text = decodeURIComponent(props?.story);
        date = decodeURIComponent(props?.date);
   }
   catch (e) {
        text =  unescape(props?.story);                                       
        date =  unescape(props?.date);                                       
   }


    return (
        <>
            <li className="listitem">
                <div className="right_content">
                    <p className="main_story">{ text }</p>
                </div>
                {
                    date&&<div className="left_content">
                        {
                            date&&<><h3>{date}</h3></>
                        }
                    </div>
                }
            </li>
        </>
    );
};

export default Note;