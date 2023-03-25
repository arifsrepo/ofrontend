import { useState } from "react";
import firebaseinit from "../Firebase/firebase.init";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, signOut }  from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

firebaseinit();

const useFirebase = () => {
    const [loading, setLoading] = useState(true);
    const [logspiner, setLogspiner] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [resetpass, setResetpass] = useState('');
    const [userinfo, setUserinfo] = useState({});
    const [userdata, setUserdata] = useState({});
    const auth = getAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        setError('');
        const currentuser = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setUser(user);
              console.log("user find : ",user);
              setLoading(false);
              // ...
            } else {
              // User is signed out
              // ...
              setLoading(false);
            }
          });
    },[])

    const handleEmailPassSignIn = () => {
      console.log("set loading true");
      setLoading(true);
      setError('');
      setLogspiner(true);
      createUserWithEmailAndPassword(auth, userdata.email, userdata.pass1)
        .then((userCredential) => {
            fetch('http://localhost:5000/user', {
              method:'POST',
              headers: {
                'content-type':'application/json'
              },
              body:JSON.stringify(userdata)
            })
            .then(setLogspiner(false))
            .then(emailVerification())
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
          setLogspiner(false)
        });
    }

    const emailVerification = () => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("set loading false");
          setLoading(false);
          if(user.email){
            navigate("/verifie");
          } else {
            navigate("/login");
          }
        });
      }

    const resendEmailVerificationLink = () => {
      sendEmailVerification(auth.currentUser)
      .then(console.log("Email sent"))
    }

    const emailLogin = () => {
      setLoading(true);
      setLogspiner(true);
      signInWithEmailAndPassword(auth, userdata.email, userdata.pass1)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          setLoading(false);
          setLogspiner(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
          setLoading(false);
          setLogspiner(false);
        });
    }

    const ressetPassword = () => {
      return sendPasswordResetEmail(auth, resetpass)
    }

    const logut = () => {
      console.log("called");
      signOut(auth).then(() => {
          // Sign-out successful.
          setUser(null);
          navigate("/login");
          console.log("User Singed Out");
        }).catch((error) => {
          // An error happened.
          setError(error.message);
        });
    }

    console.log("userdata in useFirebase : ", userdata);

    return {
        user,
        error,
        setError,
        loading,
        userdata,
        logspiner,
        setUserdata,
        userinfo,
        setResetpass,
        emailLogin,
        handleEmailPassSignIn,
        ressetPassword,
        resendEmailVerificationLink,
        logut
    }
}

export default useFirebase;