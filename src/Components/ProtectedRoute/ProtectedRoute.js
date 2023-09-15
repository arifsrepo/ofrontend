import React from 'react';
import { Navigate } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';

const ProtectedRoute = ({children}) => {
    const { user, loading } = useFirebase();
    
    const emailstate = user?.emailVerified;
    if(loading){
        return<div><br /><br /><img className="img-fluid" src="https://i.ibb.co/7k2x4s7/1-Gvgic29bgoi-GVLm-I6-AVb-Ug.gif" alt="" /></div>
    } else {
        if(user.email && emailstate){
            return children;
        }else if(!user.email) {
            console.log("redirect from PR 1, !user.email : ", !user.email, " !loading ", !loading);
            return <Navigate to="/login"></Navigate>
        } else if(!emailstate && user.email) {
            console.log("redirect from PR 2");
            return <Navigate to="/verifie"></Navigate>
        } 
    }

    return <Navigate to="/login"></Navigate>
};

export default ProtectedRoute;