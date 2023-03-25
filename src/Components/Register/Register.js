import React from 'react';
import './Register.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Form  from 'react-bootstrap/Form';
import { Button, FloatingLabel } from 'react-bootstrap';

const Register = () => {
    return (
        <div>
            <div className="reg_holder">
                <div className="reg_cover_img">
                </div>
                    <Row>
                        <Col sm md lg={4} className="reg_left">
                            <img className="reg_vector_img  img-fluid" src="https://i.ibb.co/12kqp0F/vecteezy-account-security-on-of-smartphone-button-8258648.jpg" alt="" />
                        </Col>
                        <Col sm md lg={8} className="reg_right">
                            <div className="reg_form">
                                <h2 className="reg_text"><b>REGISTRATION</b></h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Control type="name" placeholder="Fathers Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Control type="name" placeholder="Mothers Name" />
                                    </Form.Group>
                                    <FloatingLabel
                                        controlId="floatingSelectGrid"
                                        label="Select Your Gender">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                            <option value="3">Others</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <br />
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Control type="name" placeholder="Occupation" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
            </div>
        </div>
    );
};

export default Register;