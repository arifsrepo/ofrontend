import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Spinner, Button, Modal } from 'react-bootstrap';
import { Form, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useApiManager from '../../hooks/useApiManager';
import SiteNavBar from '../SiteNavBar/SiteNavBar';
import './SecretRoute.css';
import { faCirclePlus, faRotate } from '@fortawesome/free-solid-svg-icons';

const SecretRoute = () => {
    const { api, server, setApi, apiManager } = useApiManager();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    const [allsecret, setAllsecret] = useState([]);
    const [galleryData, setGalleryData] = useState({});
    let toggle = true;

    

    const handleSecretFormData = e => {
        const fieldname = e.target.name;
        const data = e.target.value;
        const newdata = {...galleryData};
        newdata[fieldname] = data;
        newdata["secret"] = true;
        setGalleryData(newdata);
    }

    const handleAddSecretGallery = e => {
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
        setAllsecret([]);
        fetch(`${api}/secret`)
        .then(res => res.json())
        .then(res => {
            setAllsecret(res)
            if(!res.length){
                if(toggle){
                    setApi(apiManager(false))
                }else {
                    setApi(apiManager(true));
                }
            }
        })
        .catch(res=>{
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
        <div>
            <div className="banner">
                
            </div>
            <SiteNavBar />
            <br />
            <div> { server } </div>
            <br />
            <h1>Secret Route</h1>
            <div className="gallery_holder">
                <Container>
                    <Row>
                        <div className="home_gallery">
                            <br />
                            <div className="custom_nav">
                                {
                                    allsecret[0]?._id?allsecret?.map(data =>
                                        <NavLink className="nav_style" to={`gallery/${data?.gallery}`}>
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
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
            <br />
            <div>
                <FontAwesomeIcon className="api_change_icon_holder" onClick={()=>setApi(apiManager(api))} icon={faRotate} />
            </div>
        </div>
    );
};

export default SecretRoute;