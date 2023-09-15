import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../Context/AuthContext";
import useApiManager from "./useApiManager";

const useActiveSession = () => {
    const location = useLocation();
    const [ipAddress, setIPAddress] = useState('')
    const [usdata, setUsdata] = useState([]);
    const contextdata = useContext(MyContext);
    const { api } = useApiManager();

    const currDate = new Date().toDateString();
    const currTime = new Date().toLocaleTimeString();

    const email = contextdata?.user?.email;
    
    useEffect(() => {
        if(email != 'arif.me.40943@gmail.com'){
            fetch('https://api.ipify.org?format=json')
              .then(response => response.json())
              .then(data => {
                  if(data != ipAddress){
                      if(!contextdata?.loading){
                          if(data?.ip != '103.120.38.27' && data?.ip != '103.120.38.26'){
                            setIPAddress(data?.ip);
                            setUsdata({ Email: contextdata?.user?.email, ipAddress : ipAddress, Visited : location?.pathname, Date : currDate, Time : currTime});
                          }
                      }
                  }
              })
            .catch(error => console.log(error))
        }
    }, [location, contextdata, ipAddress]);

    useEffect(() => {
        if(usdata?.ipAddress){
            fetch(`${api}/session`, {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(usdata)
            })
            .then(setUsdata([]));
        }
    },[location, contextdata?.loading, ipAddress, usdata])

    return { location };
};

export default useActiveSession;