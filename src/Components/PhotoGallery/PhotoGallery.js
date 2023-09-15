import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import './PhotoGallery.css';
import { Container, Form, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Photo from '../Photo/Photo';
import SiteNavBar from '../SiteNavBar/SiteNavBar';
import { useParams } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import useApiManager from '../../hooks/useApiManager';
import Masonry from 'react-masonry-css';
import { MyContext } from '../../Context/AuthContext';


const PhotoGallery = () => {
  const [uploading, setUploading] = useState(false);
  const [imageloading, setImageloading] = useState(false);
  const [loadingmore, setLoadingmore] = useState(false);
  const [heart, setHeart] = useState(true);
  const [picture, setPicture] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [codeone, setCodeone] = useState(null);
  const [codetwo, setCodetwo] = useState(null);
  const [progressdata, setProgressdata] = useState(0);
  const [upbtn, setUpbtn] = useState(false);
  const [downbtn, setDownbtn] = useState(false);
  const [ errormsg, setErrormsg] = useState([]);
  const [success, setSuccess] = useState('');
  const [datalength, setDatalength] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loadMoreDetection, setLoadMoreDetection] = useState(0);
  const [currentstate, setCurrentstate] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const params = useParams();
  const contextData = useContext(MyContext);
  const { userdata } = contextData;
  
  let notbreaker = true;
  let timer = 0;
  const { api, setApi, apiManager, apierror, msgBoxHeight, errorMsgHandler } = useApiManager();

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCodeOne = e => {
    setCodeone(e.target.value);
  }

  const handleCodeTwo = e => {
    setCodetwo(e.target.value);
  }

  const handleFileUpload = e => {
    e.preventDefault();
    setUploading(true);
    setHeart(false);
    setSuccess('');
    setErrormsg([]);
    setDownbtn(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('gallery', params?.galleryId);
    formData.append('secret', codetwo);

    fetch('https://ourbackend-zauf.onrender.com/uploads', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      setSuccess('File Uploaded Successfull');
      setUploading(false);
      setDownbtn(false);
    })
    .catch(err => {
      setErrormsg({err});
      setUploading(false);
      setDownbtn(false);
    });
  };
  
  const startTime = () => {
    timer++;
    if(notbreaker){
      if(timer < 75){
        setProgressdata(timer);
      }
      let interval = Math.floor(Math.random() * (1500 - 500 + 1) + 500)
      setTimeout(function() {startTime()}, interval);
    }
  }

  const stopTimer = now => {
    for(let i = now; i < 101; i++){
      setProgressdata(i);
    }
  }

  const handleLen = e => {
    e.preventDefault();
    setImageloading(true);
    setHeart(false);
    setProgressdata(0);
    setUpbtn(true);
    //setErrormsg([]);
    setSuccess('');
    timer = 0;
    startTime();

    const secret = { secret : codeone, gallery : params?.galleryId, start: picture?.length, limit: limit};
    // fetch('http://localhost:5000/dlen',{
    fetch(`${api}/dlen`,{
      method:'POST',
      headers:{
          'content-type':'application/json'
      },
      body:JSON.stringify(secret)
    })
    .then(res => res.json())
    .then(res => {
      setDatalength(res);
      // fetch('http://localhost:5000/picture',{
      fetch(`${api}/picture`,{
        
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(secret)
      })
      .then(res => res.json())
      .then(data => {
        setPicture(data);
        notbreaker = false;
        setImageloading(false);
        stopTimer(progressdata);
        setUpbtn(false);
        setDownbtn(true);
        setLoadMoreDetection(loadMoreDetection + 1);
        setCurrentstate('');
      })
      .catch((err) => {
        if(err){
          setErrormsg({err});
        }
        notbreaker = false;
        setImageloading(false);
        stopTimer(progressdata);
        setLimit(3);
        setLoadMoreDetection(loadMoreDetection + 1);
        setCurrentstate('Retrying, Please Wait!');
        errorMsgHandler();
        setApi(apiManager(api));
      });
    })
    .catch((err) => {
      if(err){
        setErrormsg({err});
      }
      notbreaker = false;
      setImageloading(false);
      stopTimer(progressdata);
      setLimit(3);
      setLoadMoreDetection(loadMoreDetection + 1);
      setCurrentstate('Retrying, Please Wait!');
      errorMsgHandler();
      setApi(apiManager(api));
    });
  }

  const handleLoadMore = () => {
    //setErrormsg([]);
    setSuccess('');
    if(picture?.length < datalength){
      setLoadingmore(true);
      const secret = { secret : codeone, gallery : params?.galleryId, start: picture?.length, limit: limit};
      fetch(`${api}/picture`,{
      // fetch('https://odd-teal-haddock-wig.cyclic.app/picture',{
      // fetch('http://localhost:5000/picture',{
      // fetch('https://ourbackend-zauf.onrender.com/picture',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(secret)
      })
      .then(res => res.json())
      .then(data => {
        let arr = picture;
        Array.prototype.push.apply(arr,data);
        setPicture(arr);
        setUpbtn(false);
        setLoadingmore(false);
        setLoadMoreDetection(loadMoreDetection + 1);
        setCurrentstate('');
      })
      .catch((err) => {
        if(err){
          setErrormsg({err});
        }
        setLoadingmore(false);
        setLimit(3);
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


  return (
      <div>
        <SiteNavBar />
          <br />
          <h3>Image of {params?.dateId}</h3>
          <br />
          <Container>
            <div>

            </div>
              <div className="main_form_control">
                <div className="form_control">
                  <Form onSubmit={handleFileUpload}>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control required onChange={handleFileSelect} type="file" name="myFile" />
                    </Form.Group>
                    <div className="uploader_btn">
                    <Form.Control required onChange={handleCodeTwo} className="code_holder_input" type="number" name="num1" />
                    <Button disabled={upbtn} variant="primary" type="submit"> Upload </Button>
                      {
                        uploading?<Spinner animation="grow" />:''
                      }
                    </div>
                  </Form>
                  <br />
                  <Form onSubmit={handleLen} className="code_holder">
                    <Form.Control required onChange={handleCodeOne} className="code_holder_input" type="number" name="num1" />
                    <Button disabled={downbtn} type="submit"> Show Image </Button>
                      {
                        imageloading?<Spinner animation="grow" />:''
                      }
                  </Form>
                  <br />
                  <ProgressBar now={progressdata} />
                  <br />
                </div>
              </div>

            <div className="msg_div">
              <p>{success?success:''}</p>
              <p>{currentstate&&currentstate}</p>
              {
                datalength > 0?<> Total {datalength} Image Found </>:""
              }
              <br />
              <br />
              <div className="check_button_holder">
                <Form>
                  <Form.Check // prettier-ignore
                    onChange={onSwitchAction}
                    id="custom-switch"
                    type="switch"
                    label="🢀 Click This To Change View"
                    checked={isSwitchOn}
                  />
                </Form>
              </div>
            </div>

            <div className="masonry-collage-container">
              <Masonry
                breakpointCols={{
                  default: `${isSwitchOn?1:4}`,
                  450: `${isSwitchOn?1:2}`,
                  700: `${isSwitchOn?1:3}`,
                }}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
              >
                { picture?.map((data) => <Photo data={data} codeone={codeone}></Photo>) }
              </Masonry>
            </div>
            <div className="load_more_div">
                {
                  loadingmore&&<Spinner className="spiner_style" animation="border" variant="danger" />
                }
            </div>
            <br />
          </Container>
            <br />
            <div style={msgBoxHeight} className="show_error_section">
                <p>{errormsg?.err?.message}<br ></br>{apierror&&apierror}</p>
            </div>
      </div>
  );
};

export default PhotoGallery;