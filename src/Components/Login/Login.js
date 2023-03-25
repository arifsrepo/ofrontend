import React, { useContext, useState } from 'react';
import './Login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFirebase from '../../hooks/useFirebase';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { MyContext } from '../../Context/AuthContext';

const Login = () => {
    const contextData = useContext(MyContext);

    const { user, loading, userdata, error, logspiner, setError, setUserdata, emailLogin, ressetPassword, setResetpass, handleEmailPassSignIn } = contextData;


    console.log("Context data : ", contextData.emailLogin);

    const [toggler, setToggler] = useState(false);
    const [show, setShow] = useState(false);
    const [reseterror, setReseterror] = useState('');
    const [sendloading, setSendloading] = useState(false);
  
    const handleClose = () => {
        setShow(false);
        setReseterror('');
    }
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const toggling = e => {
        setToggler(e.target.checked);
    }

    if(!loading && user?.email){
        if(user?.email){
            navigate("/");
        }
    }
    
    const handleFormData = e => {
        setError('');
        const newUserData = {...userdata};
        newUserData[e.target.name] = e.target.value;
        setUserdata(newUserData);
    }
    
    const handleFormSubmit = e => {
        e.preventDefault();
        if(toggler){
            if(userdata.pass1){
                if(userdata?.pass1 === userdata?.pass2){
                    handleEmailPassSignIn();
                } else {
                    setError("Password Dis Not Matched");
                }
            } else {
                setError("Enter Password");
            }
        } else {
            emailLogin();
        }
    }

    const handlePassChangeEmail = e => {
        setResetpass(e.target.value);
        setReseterror('');
    }

    const sendResetMail = () => {
        setSendloading(true);
        ressetPassword()
        .then(() => {
            setReseterror("A Password Recovery Link Has Sent To Your Email");
            setSendloading(false);
        })
        .catch((error) => {
            setReseterror(error.message);
            setSendloading(false);
        });
    }

    return (
        <div className="login_div">
            <>
                <Modal show={show}>
                    <Modal.Header>
                    <Modal.Title>Password Reset Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control required onBlur={handlePassChangeEmail} type="email" placeholder="Your Email Address" autoFocus />
                        </Form.Group>
                        <div className="reset_msg">
                            <p>{reseterror}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="modal_footer_custom">
                            <div className="modal_button_holder">
                                <Button variant="secondary" onClick={handleClose}> Close </Button>
                                <Button variant="primary" onClick={sendResetMail}> Send </Button>
                            </div>
                            {
                                sendloading?<Spinner animation="grow" />:''
                            }
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
            <div className="login_blur_div">
                <br />
                <Container className="login_container">
                    <Row>
                        <Col className="col1" sm md lg={6} xs={12}>
                            <h1 className="headder_text"><b>WELCOME</b></h1>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, tempora ratione. Nihil, esse praesentium. Officiis fuga at deleniti non expedita tempora beatae, cumque ipsa, ipsam cum ea maiores eaque esse?</p>
                            </div>
                        </Col>
                        <Col className="col2" sm md lg={6} xs={12}>
                            <div className="login_form_holder">
                                <Form onSubmit={handleFormSubmit}>
                                {
                                    toggler?<>
                                    <h1>Register</h1>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control required onBlur={handleFormData} name="email" type="email" placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control required onBlur={handleFormData} name="name" type="name" placeholder="Your Name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required onBlur={handleFormData} name="pass1" type="password" placeholder="Password" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control required onBlur={handleFormData} name="pass2" type="password" placeholder="Confirm Password" />
                                    </Form.Group>
                                    </>
                                    :
                                    <>
                                    <h1>Log In</h1>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control required onBlur={handleFormData} name="email" type="email" placeholder="Enter email" />
                                        </Form.Group>
    
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required onBlur={handleFormData} name="pass1" type="password" placeholder="Password" />
                                        </Form.Group>
                                    </>
                                }
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check onChange={toggling} type="checkbox" label="New User?" />
                                </Form.Group>
                                
                                <div className="spiner_holder">
                                <div className="btn_holder">
                                    <Button variant="primary" type="submit">{toggler?'Register':'Log In'}</Button>
                                    {toggler?'':<Button className="forget_pass_button" variant="secondary" onClick={handleShow}>Forgotten Password?</Button>}
                                </div>
                                    <div className="spiner">
                                    {
                                        logspiner?<Spinner animation="grow" />:''
                                    }
                                    </div>
                                </div>
                                </Form>
                                <br />
                                <b className="err_msg">{error}</b>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Login;