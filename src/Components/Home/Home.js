import React from 'react';
import { useContext } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { MyContext } from '../../Context/AuthContext';
import Card from 'react-bootstrap/Card';
import './Home.css';

const Home = () => {
    const data = useContext(MyContext);
    const {logut} = data;

    return (
        <div className="home_main">
            <div className="banner">
                
            </div>
            <br />
            <div className="gallery_holder">
                <Container>
                    <Row>
                        <div className="home_gallery">
                            <br />
                            <div className="custom_nav">
                                <NavLink className="nav_style" to={`/gallery/${"gallery_one"}`}>
                                    <Card
                                        style={{ width: '18rem', cursor:'pointer'}}
                                        className="mb-2 for_shadow"
                                    >
                                    <Card.Header>28 0ct 2022</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{"Primary"} Card Title </Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                                </NavLink>

                                <NavLink className="nav_style" to={`/gallery/${"gallery_two"}`}>
                                    <Card
                                        style={{ width: '18rem', cursor:'pointer' }}
                                        className="mb-2 for_shadow"
                                    >
                                    <Card.Header>11 Dec 2022</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{"Secondary"} Card Title </Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                                </NavLink>

                                <NavLink className="nav_style" to={`/gallery/${"gallery_three"}`}>
                                    <Card
                                        style={{ width: '18rem', cursor:'pointer' }}
                                        className="mb-2 for_shadow"
                                    >
                                    <Card.Header>07 Jan 2023</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{"Secondary"} Card Title </Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                                </NavLink>
                            </div>
                            <h1>Home</h1>
                            <Button onClick={logut}>Logut</Button>
                        </div>
                    </Row>
                </Container>
            </div>
            <br />
        </div>
    );
};

export default Home;