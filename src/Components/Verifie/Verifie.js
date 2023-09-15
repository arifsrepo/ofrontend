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
            console.log("Redirected From Verify");
            navigate("/");
        }
    }

    return (
        <div className="verifie_main_div">
            <div className="verifie_img_div">
                <img className="img-fluid verifie_img" src="https://i.ibb.co/cLb2HvD/Email-Marketing-Vector-Background-PNG-Image.png" alt=""/>
            </div>
            <br />
            <h1 className="verifie_heading">Verifie your Email Address</h1>
            <div className="verife_msg_div">
                <div className="welcome_msg">
                    <p> Hi, We just need to verify your email address before you access. We have sent a verification link to your email <b>{user?.email}</b>. Check your email & click the link to verify your email address. Thanks!</p>
                    <br />
                    <div className="btn_holder_flexer">
                        <div className="resend_btn_holder">
                            <Button onClick={resendEmailVerificationLink}>Resend Link?</Button>
                            <Button onClick={logut}>Logut</Button>
                        </div>
                    </div>
                    <br />
                    <p>If you compleate email link verification, click the button below!</p>
                    <Button href="https://tumiarami-2022.web.app"> Finish </Button>
                </div>
            </div>
        </div>
    );
};

export default Verifie;