import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MyPlayer = (props) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [error, setError] = useState(null);
    let base64Audio = props?.props;
  
    useEffect(() => {
      try {
        const binaryData = atob(base64Audio);
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
  
        const blob = new Blob([uint8Array], { type: 'audio/mpeg' }); 
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
      } catch (e) {
        setError(e.message);
      }
    }, [base64Audio]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
        <div>  
            {
                audioSrc?
                <AudioPlayer
                    src={audioSrc}
                    onPlay={e => console.log("onPlay")}
                    // other props here
                />:"Audio Loading...."
            }
        </div>
    );
};

export default MyPlayer;