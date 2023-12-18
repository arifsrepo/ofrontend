import React, { useState } from 'react';
import './OfflineDB.css';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import SiteNavBar from '../SiteNavBar/SiteNavBar';
import Masonry from 'react-masonry-css';
import Photo from '../Photo/Photo';

const OfflineDB = () => {
    const [disabled, setDisabled] = useState(false);
    const [secret, setSecret] = useState(null);
    const [picture, setPicture] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [processing, setProcessing] = useState(false);

    const onSwitchAction = () => {
      setIsSwitchOn(!isSwitchOn);
    };

    const handleCodeOne = e => {
      setSecret(e.target.value);
    }

    const handleSubmit = e => {
      e.preventDefault();
      setProcessing(true);
      setDisabled(true);
        setTimeout(() => {
            let i = 0;
            let arr = picture;
            if(picture?.length){
                for(i; i < picture?.length; i++){
                  const decoded = decode(secret, picture[i].b64);
                  picture[i].b64 = decoded;
                }
            }
            setSubmitted(true);
            setProcessing(false);
            setDisabled(false);
          }, 1000);
    }
    
    const handleFileChange = async (event) => {
      setPicture([]);
      setSubmitted(false);
      const file = event.target.files[0];
    
        if (file) {
          try {
            const fileContent = await readFile(file);
            const data = JSON.parse(fileContent);
    
            // Now 'data' contains the array of objects from the text file
            setPicture(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
    };
    
    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
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

    return (
        <div>
            <div className="offline_db_main_holder">
                <SiteNavBar />
                <div className="offline_db_input_controll">
                    <Form className="offline_db_input_holder" controlId="exampleForm.ControlInput2" onSubmit={handleSubmit}>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Control required type="file" name="myFile" accept=".txt, .json, text/plain, application/json" onChange={handleFileChange} />
                        </Form.Group>
                        <div className="offline_db_input_flexer">
                            <Form.Control required className="code_holder_input" type="number" name="num1" onChange={handleCodeOne} />
                            <Button type="submit" disabled={disabled}>
                              {
                                processing?<><Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  />
                                  &nbsp;
                                  Processing...</>:"Show Image"
                                }
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <Container>
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
                  { submitted&&picture?.map((data) => <Photo data={data} offline={true}></Photo>) }
                </Masonry>
              </div>
            </Container>
        </div>
    );
};

export default OfflineDB;