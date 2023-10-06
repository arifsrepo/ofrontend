import React, { useState } from 'react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import Note from '../Note/Note';
import SiteNavBar from '../SiteNavBar/SiteNavBar';
import "./NoteTwo.css";
import useApiManager from '../../hooks/useApiManager';

const NoteTwo = () => {
    const [show, setShow] = useState(false);
    const [textloading, setTextloading] = useState(false);
    const [codeno, setCodeno] = useState(null);
    const [story, setStory] = useState(null);
    const [result, setResult] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const { api } = useApiManager();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCodeNo = e => {
      setCodeno(e.target.value);
    }

    const handleShowStory = e => {
        e.preventDefault();
        setTextloading(true);
        setDisabled(true);
        const payload = {"codeno" : codeno};
        fetch(`${api}/notetwoshow`,{
        // fetch("http://localhost:5000/notetwoshow",{
          method:'POST',
          headers:{
              'content-type':'application/json'
          },
          body:JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            setResult(data);
            setTextloading(false);
            setDisabled(false);
        })
    } 

    const handleFormData = e => {
        const newUserData = {...story};
        newUserData[e.target.name] = e.target.value;
        setStory(newUserData);
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        setTextloading(true);
             fetch(`${api}/notetwo`, {
            //  fetch('http://localhost:5000/notetwo', {
              method:'POST',
              headers: {
                'content-type':'application/json'
              },
              body:JSON.stringify(story)
        })
        .then(res => res.json())
        .then(res => {
            setTextloading(false);
        })
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Date</Form.Label>
                                <Form.Control onBlur={handleFormData}  autoComplete="off" name="date" type="text" placeholder="" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control required onBlur={handleFormData} autoComplete="off" name="text" as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control required onBlur={handleFormData} className="encode_holder_input" type="number" name="secret" />
                            </Form.Group>
                            <br />
                            <div className="form_fotter">
                            <div className="form_button_holder">
                                <Button variant="secondary" onClick={handleClose}> Close </Button>
                                <Button variant="primary" type="submit"> Save Changes </Button>
                            </div>
                            <div>
                                {
                                    textloading?<Spinner animation="grow" />:""
                                }
                            </div>
                        </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <div className="note_banner">
                <div className="controll_bar">
                    <Form onSubmit={handleShowStory} className="code_holder" controlId="exampleForm.ControlInput2">
                    <Form.Control required onChange={handleCodeNo} className="code_holder_input" type="number" name="num1" />
                    <Button type="submit" disabled={disabled}> Show </Button>
                        {
                            textloading?<Spinner animation="grow" />:''
                        }
                    </Form>
                </div>
                <br />
                <br />
                <SiteNavBar />
            </div>
            <div className="note_holder">
                <div className="timeline">
                    <br />
                    <br />
                    <br />
                    <ul>
                        {
                            result?.map(data =><Note date={data.date} story={data.story}></Note>)
                        }
                        <div className="cbth"></div>
                    </ul>
                </div>
            </div>
            <div>
                <FontAwesomeIcon onClick={handleShow} className="icon_style_note" icon={faCirclePlus} />
            </div>
        </>
    );
};

export default NoteTwo;