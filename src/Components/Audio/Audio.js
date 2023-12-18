import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Audio.css";
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import MyPlayer from '../MyPlayer/MyPlayer';
import SiteNavBar from '../SiteNavBar/SiteNavBar';
import { faCirclePlay, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListGroup from 'react-bootstrap/ListGroup';
import useApiManager from '../../hooks/useApiManager';

const Audio = () => {
    const [show, setShow] = useState(false);
    const [sldb, setSldb] = useState(null);
    const [audio, setAudio] = useState([]);
    const [playingdata, setPlayingdata] = useState(null);
    const [audioLoading, setAudioLoading] = useState(false);
    const [code, setCode] = useState(null);
    const [ecode, setEcode] = useState(null);
    const [audioname, setAudioname] = useState('untitled');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { api } = useApiManager();
    
    const encode = (secret, plaintext) => {
        const enc = [];
        for (let i = 0; i < plaintext.length; i += 1) {
          const keyC = secret[i % secret.length];
          const encC = String.fromCharCode((plaintext.charCodeAt(i) + keyC.charCodeAt(0)) % 256);
          enc.push(encC);
        }
        const str = enc.join('');
        console.log("encoding");
        return btoa(str); // Use btoa to encode the result as base64
    };

    const decode = (secret, ciphertext) => {
      const dec = [];
      const enc = atob(ciphertext); // Use atob() to decode base64
      for (let i = 0; i < enc.length; i += 1) {
        const keyC = secret[i % secret.length];
        const decC = `${String.fromCharCode((256 + enc.charCodeAt(i) - keyC.charCodeAt(0)) % 256)}`;
        dec.push(decC);
      }
      return dec.join('');
    };
  
    const handleFileChange = (event) => {
      if (event.target.files[0]) {
        setAudioname(event.target.files[0].name);
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result.split(',')[1]; // Extract base64 data from data URL
          setSelectedFile(encode(code, base64));
        };
        reader.readAsDataURL(event.target.files[0]); // Read the file as a data URL
      }
      setUploadProgress(0);
    };

    const handleCode = e => {
        setCode(e.target.value);
    }

    const handleEcode = e => {
        setEcode(e.target.value);
    }
  
    const handleUpload = async () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('audio', selectedFile);
        formData.append('db', sldb);
        formData.append('name', audioname);

        try {
            const response = await axios.post(`${api}/audio`, formData, {
                onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
                setUploadProgress(progress);
                },
            });
  
          console.log('Audio uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      }
    };

    useEffect(() => {
      fetch(`${api}/dbs`)
      .then(response => response.json())
      .then(result => {
        setSldb(result[0].selected);
      })
      .catch(err => {
        console.log({err});
      });
    },[])

    const getAudio = e => {
        e.preventDefault();
        setAudioLoading(true);
        fetch(`${api}/audio`)
        .then(res => res.json())
        .then(audio => {
            setAudio(audio);
            setAudioLoading(false);
            let i = 0;
            if(audio?.length){
                for(i; i < audio?.length; i++){
                  const decoded = decode(ecode, audio[i].b64);
                  audio[i].b64 = decoded;
                }
            }
        })
    }

    const audioSelect = audiodata => {
        setPlayingdata(audiodata);
    }

  
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Audio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                      <Form.Control required  type="file" accept="audio/*" onChange={handleFileChange} name="myFile" />
                        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
                        <br />
                        <Form.Control required onChange={handleCode} className="code_holder_input" type="number" name="num1" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary"  onClick={handleUpload}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="note_banner">
                <div className="controll_bar">
                    <Form className="code_holder" controlId="exampleForm.ControlInput2" onSubmit={getAudio}>
                        <Form.Control required onChange={handleEcode} className="code_holder_input" type="number" name="num1" />
                        <Button type="submit"> Show </Button>
                        { audioLoading?<Spinner animation="grow" />:'' }
                    </Form>
                </div>
                <br />
                <br />
                <SiteNavBar />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
                <Container>
                    <Row>
                        <Col sm md lg={6} xs={12} className="audio_banner">
                            <img className="img-fluid" src="https://i.ibb.co/5462ByT/FB-IMG-1653839216004.jpg" alt="" />
                        </Col>
                        <Col sm md lg={6} xs={12} className="audio_list">
                            <div className="list_holder">
                                <h2>Play List</h2>
                                <ListGroup variant="flush">
                                    {
                                        audio?.map(data=>
                                            <ListGroup.Item>
                                                <div className="list_item_flexer" onClick={() => audioSelect(data?.b64)}>
                                                    <div>{data?.name}</div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faCirclePlay} />
                                                    </div>
                                                </div>
                                            </ListGroup.Item>)
                                    }
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Container>
            <div className="player_holder">
                {
                    audio[0]?.b64&&<MyPlayer props={playingdata} />
                }
            </div>
            <div>
                <FontAwesomeIcon onClick={handleShow} className="add_audio_icon" icon={faCirclePlus} />
            </div>
            <div>        

            </div>
        </div>
    );
};

export default Audio;