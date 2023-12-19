import React, { useState } from 'react';
import { useContext } from 'react';
import './Home.css';
import { Button, Container, Form, Row, Spinner } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { MyContext } from '../../Context/AuthContext';
import Card from 'react-bootstrap/Card';
import SiteNavBar from '../SiteNavBar/SiteNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faRotate } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import useApiManager from '../../hooks/useApiManager';
import Masonry from 'react-masonry-css';

const Home = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [galleryData, setGalleryData] = useState({});
    const [allgallery, setAllgallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ errormsg, setErrormsg] = useState([]);
    const [rotation, setRotation] = useState(0);
    let toggle = true;

    const { api, server, setApi, apiManager, apierror, errorMsgHandler, msgBoxHeight } = useApiManager();
    const data = useContext(MyContext);

    const handleFormData = e => {
        const fieldname = e.target.name;
        const data = e.target.value;
        const newdata = {...galleryData};
        newdata[fieldname] = data;
        newdata["secret"] = false;
        setGalleryData(newdata);
    }

    const handleAddGallery = e => {
        e.preventDefault()
        setLoading(true);
        fetch(`${api}/gallery`,{
            method: "POST",
            headers:{
                 "content-type":"application/json"
            },
            body: JSON.stringify(galleryData)
        })
        .then(res => res.json())
        .then(res => setLoading(false))
        .catch(res => console.log(res))
    }

    useEffect(()=> {
        setErrormsg([]);
        fetch(`${api}/gallery`)
        .then(res => res.json())
        .then(res => {
            setAllgallery(res)
            if(!res.length){
                if(toggle){
                    setApi(apiManager(false))
                }else {
                    setApi(apiManager(true));
                }
            }
        })
        .catch(res=>{
            setErrormsg({res});
            if(!res.length){
                if(toggle){
                    setApi(apiManager(false))
                }else {
                    setApi(apiManager(true));
                }
            }
        })
    },[api, show])

    return (
        <div className="home_main">
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleAddGallery}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Gallery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Enter Date</Form.Label>
                                <Form.Control autoComplete="off" required onChange={handleFormData} name="date" type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Location</Form.Label>
                                <Form.Control autoComplete="off" required onChange={handleFormData} name="location" type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Enter Gallery Name Without Space</Form.Label>
                                <Form.Control autoComplete="off" required onChange={handleFormData} name="gallery" type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control autoComplete="off" required onChange={handleFormData} name="des" as="textarea" rows={3} />
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="form_fotter">
                            <div className="form_button_holder">
                                <Button variant="secondary" onClick={handleClose}> Close </Button>
                                <Button variant="primary" type="submit"> Save Changes </Button>
                            </div>
                            <div>
                                {
                                    loading?<Spinner animation="grow" />:""
                                }
                            </div>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
            <div className="banner">
                
            </div>
            <SiteNavBar />
            <br />
            <div> { server }  </div>
            <br />
            <p> { errormsg?.res?.message } </p>
            <div className="gallery_holder">
                <Container>
                    <Row>
                        <div className="masonry-collage-container2">
                            <Masonry
                                breakpointCols={{
                                default: 4,
                                1000: 2,
                                1300: 3,
                                700: 1,
                                }}
                                className="masonry-grid"
                                columnClassName="masonry-grid-column"
                            >
                                {
                                    allgallery[0]?._id?allgallery?.map(data =>
                                        <NavLink className="nav_style" to={`gallery/${data?.gallery}/date/${data?.date}`}>
                                            <Card
                                                style={{ width: '18rem', cursor:'pointer'}}
                                                className="mb-2 for_shadow"
                                            >
                                                <Card.Header>{data?.date}</Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{data?.location}</Card.Title>
                                                    <Card.Text>{data?.des}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </NavLink>
                                    )
                                    :
                                    <div className="heart_loading_img_holder"><img className="img-fluid" src="https://i.ibb.co/Y8hLmrG/preview.gif" alt="" /></div>
                                }
                            </Masonry>
                        </div>
                    </Row>
                </Container>
            </div>
            <div style={msgBoxHeight} className="show_error_section">
                <p>{apierror&&apierror}</p>
            </div>
            <div>
                <FontAwesomeIcon className="api_change_icon_holder" onClick={()=>{ setApi(apiManager(api));setAllgallery([]);errorMsgHandler()}} icon={faRotate} />
            </div>
            <br />
            <div>
                <FontAwesomeIcon onClick={handleShow} className="icon_style" icon={faCirclePlus} />
            </div>
        </div>
    );
};

export default Home;