import React from 'react';
import './PhotoGallery.css';
import { Container, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Photo from '../Photo/Photo';

const PhotoGallery = () => {
  const [postImage, setPostImage] = useState({myFile:""});
  const [errors, setErrors] = useState('');
  const [uploading, setUploading] = useState(false);
  const [report, setReport] = useState('');
  const [picture, setPicture] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFileUpload();
  };

  const convertToBase64 = (e) => {
    setReport('');
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const setImage = async (e) => {
    setErrors('');
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
    console.log('setting data');
    // setPostImage(base64);
  }

  const handleFileUpload = () => {
    setUploading(true);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      enctype:"multipart/form-data",
      headers:{
        Accept: "application/json", 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body:  JSON.stringify({
        base64 : postImage
    })
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.acknowledged){
          setReport('Upload Successfully')
        }
        console.log("Success:", result);
        setPostImage('');
        setUploading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploading(false);
      });
   };










  useEffect(() => {
    fetch('http://localhost:5000/picture')
    .then(res => res.json())
    .then(data => setPicture(data))
  }, [picture])


    return (
        <div>
            <h1>Gallery 1</h1>
            <Container>
              <div>

              </div>
              <div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Multiple files input example</Form.Label>
                  <Form.Control onChange={(e) => setImage(e)} type="file" name="myFile" />
                </Form.Group>
                <div className="uploader_btn">
                  <Button variant="primary" type="submit"> Upload </Button>
                  {
                    uploading?<Spinner animation="grow" />:''
                  }
                </div>
              </Form>
              </div>
              <p>{report}</p>
              <br />
              <div className="img_holder">
                {
                  picture?.map(data => <Photo data={data}></Photo>)
                }
              </div>
            </Container>
        </div>
    );
};

export default PhotoGallery;