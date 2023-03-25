import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../Context/AuthContext';
import useFirebase from '../../hooks/useFirebase';
import './Verifie.css';

const Verifie = () => {
    const data = useContext(MyContext);
    const {  user, loading, resendEmailVerificationLink, logut } = data;
    const navigate = useNavigate();

    if(!loading){
        if(user?.emailVerified){
            navigate("/");
        }
    }

    return (
        <div className="verifie_main_div">
            <div className="verifie_img_div">
                <img className="verifie_img" src="https://i.ibb.co/cLb2HvD/Email-Marketing-Vector-Background-PNG-Image.png" alt=""/>
            </div>
            <br />
            <h1 className="verifie_heading">Verifie your Email Address</h1>
            <div className="verife_msg_div">
                <p> Hi, We just need to verify your email address before you can access. We have sent a verification link to your email <b>{user?.email}</b>. Click the link to verify your email address. Thanks!</p>
                <br />
                <Button onClick={resendEmailVerificationLink}>Resend Link?</Button>
                <br />
                <br />
                <Button onClick={logut}>Logut</Button>
            </div>
        </div>
    );
};

export default Verifie;