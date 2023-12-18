import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import useApiManager from '../../hooks/useApiManager';

const SaveButton = (props) => {
  const [pdata, setPdata] = useState([]);
  const [download, setDownload] = useState(false);
  const [readytodown, setReadytodown] = useState(false);
  const [pegination, setPegination] = useState(0);
  const [loadingmore, setLoadingmore] = useState(false);
  const [picture, setPicture] = useState([]);
  const [upbtn, setUpbtn] = useState(false);
  const [ errormsg, setErrormsg] = useState([]);
  const [success, setSuccess] = useState('');
  const [datalength, setDatalength] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loadMoreDetection, setLoadMoreDetection] = useState(0);
  const [currentstate, setCurrentstate] = useState('');
  const [terminator, setTerminator] = useState(true);
  const [dbnumberstate, setDbnumberstate] = useState(1);
  const [loadMoreStarting, setLoadMoreStarting] = useState(limit);
  const { api, setApi, apiManager, apierror, msgBoxHeight, errorMsgHandler, setMessageleft } = useApiManager();
  let notbreaker = true;
  let starting = limit;
  const currDate = new Date().toDateString();

  // const fetchDataFromMongoDB = (currentdb) => {
  //   setDownload(true);
  //   setReadytodown(false);
  //   console.log("Initial Checking  db = ", currentdb, " < 2 ");
  //   if(currentdb > 2) { return; }
  //     const secret = { gallery: props?.gallery, db : currentdb};
  //     fetch(`${api}/dlen`,{
  //       method:'POST',
  //       headers:{
  //           'content-type':'application/json'
  //       },
  //       body:JSON.stringify(secret)
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("received data : ", data);
  //       setDatalength(data);
  //       if(data === 0){
  //         console.log("changing db Main : ", currentdb);
  //         //setCurrentdb(currentdb + 1);
  //         terminator = true;
  //         console.log("terminator is true : ", terminator);
  //         fetchDataFromMongoDB(currentdb + 1);
  //       }
  //       if(data > 0){
  //         if(data>20){
  //           console.log("setting pegination : ", Math.ceil(data/20));
  //           setPegination(Math.ceil(data/20))
  //         }
  //         console.log("increasing loadmore with db : ", currentdb, "and res : ", data);
  //         setLoadMoreDetection(1);
  //         setPegination(1);
  //       }
  //     })
  // };

  const saveDataToTxtFile = () => {
    if (!picture) {
      console.error('No data to save');
      return;
    }

    const manualText = `
        \`\`\`


        const decode = (secret, ciphertext) => {
        const dec = [];
        const enc = atob(ciphertext); // Use atob() to decode base64
        for (let i = 0; i < enc.length; i += 1) {
            const keyC = secret[i % secret.length];
            const decC = \`\${String.fromCharCode((256 + enc.charCodeAt(i) - keyC.charCodeAt(0)) % 256)}\`;
            dec.push(decC);
        }
        return dec.join('');
        };

        \`\`\`\n\n\n
    `;

    const formattedData = JSON.stringify(picture, null, 2); // Pretty print JSON
    // const content = manualText + formattedData;
    const content = formattedData;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${props?.date} Backup On ${currDate}.txt`;

    // Trigger download
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
  };


  const fetchDataFromMongoDB = dbnumber => {
    if(dbnumber === 1){
      setDownload(true);
    }
    const secret = { gallery: props?.gallery, start : 0, limit : limit, db : dbnumber};
    fetch(`${api}/dlen`,{
      method:'POST',
      headers:{
          'content-type':'application/json'
      },
      body:JSON.stringify(secret)
    })
    .then(res => res.json())
    .then(res => {
      setDatalength(res + picture.length);
      setPegination(Math.ceil(res/limit));
      if(res < 1 && dbnumber === 1){
        loadOtherDB();
        return;
      }
      fetch(`${api}/picture`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(secret)
      })
      .then(res => res.json())
      .then(data => {
        if(dbnumber === 2 && (picture.length) + data >= datalength){
          setDownload(false);
          setReadytodown(true);
        }
          let arr = picture;
            if(data?.length){
                Array.prototype.push.apply(arr,data);
                setPicture(arr);
            }
        notbreaker = false;
        setLoadMoreDetection(loadMoreDetection + 1);
        if(datalength > 0 && !terminator){
          setLoadMoreStarting(loadMoreStarting + limit);
        }
      })
      .catch((err) => {
        if(err){
          setErrormsg({err});
        }
        notbreaker = false;
        //setLimit(3);
        setLoadMoreDetection(loadMoreDetection + 1);
        setCurrentstate('Failed To Fetch, Try Again!');
        errorMsgHandler();
        setApi(apiManager(api));
      });
    })
    .catch((err) => {
      if(err){
        setErrormsg({err});
      }
      notbreaker = false;
      //setLimit(3);
      setLoadMoreDetection(loadMoreDetection + 1);
      setCurrentstate('Failed To Fetch, Try Again!');
      errorMsgHandler();
      setApi(apiManager(api));
    });
  }

  const handleLoadMore = () => {
    if(picture?.length === datalength && datalength > 0 && terminator){
      loadOtherDB();
    }

    if(!terminator && picture.length >= datalength){
      setDownload(false);
      setReadytodown(true);
    }

    if(picture?.length < datalength){
      setLoadingmore(true);
      const secret = { gallery: props?.gallery, start: terminator?picture.length : loadMoreStarting, limit: limit, db:terminator?1:2 };
      fetch(`${api}/picture`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(secret)
      })
      .then(res => res.json())
      .then(data => {
        let arr = picture;
        if(data?.length){
              Array.prototype.push.apply(arr,data);
              setPicture(arr);
              starting = starting + limit;
        }
        setUpbtn(false);
        setLoadingmore(false);
        setLoadMoreDetection(loadMoreDetection + 1);
        setCurrentstate('');
        if(datalength > 0 && !terminator){
          setLoadMoreStarting(loadMoreStarting + limit);
        }
      })
      .catch((err) => {
        if(err){
          setErrormsg({err});
        }
        setLoadingmore(false);
        //setLimit(3);
        setLoadMoreDetection(loadMoreDetection + 1);
        setCurrentstate('Retrying, Please Wait!');
        errorMsgHandler();
        setApi(apiManager(api));
      });
    }
  }

  useEffect(() => {
    handleLoadMore();
  },[loadMoreDetection])

  const loadOtherDB = () => {
    setTerminator(false);
      setDbnumberstate(2);
      fetchDataFromMongoDB(2);
  }


  return (
    <div>
        <Button onClick={readytodown?saveDataToTxtFile:()=>fetchDataFromMongoDB(1)} variant="success" disabled={download}> {download?<><Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            />
            &nbsp;
            Processing...</>:readytodown?"Download Now":"Create Backup"}
        </Button>
    </div>
  );
};

export default SaveButton;
