import { useState } from "react";

const useApiManager = () => {
    const [api, setApi] = useState(null);
    const [server, setServer] = useState("");
    const [apierror, setApierror] = useState("");
    const [msgBoxHeight, setMsgBoxHeight] = useState({height:'0px'});
    let workingapi = null;
    const rand = Math.floor(Math.random() * 2);

    if(api === null){
        if(rand > 0){
            setApi("https://odd-teal-haddock-wig.cyclic.app");
            setServer("Response From Server - 1");
        } else {
            setApi("https://ourbackend-zauf.onrender.com");
            setServer("Response From Server - 2");
        }
    }

    const apiManager = apistate => {
        //console.log(apistate);
        if(apistate === 'https://ourbackend-zauf.onrender.com'){
            setApierror("Retrying With Cyclic API, Please Wait!");
            workingapi = "https://odd-teal-haddock-wig.cyclic.app";
            setServer("Response From Server - 1");
            return workingapi;
        } else {
            setApierror("Retrying With Render API, Please Wait!");
            workingapi = "https://ourbackend-zauf.onrender.com";
            setServer("Response From Server - 2");
            return workingapi;
        }
    }

    const errorMsgHandler = () => {
        setMsgBoxHeight({height:'50px', display:'block'})
        setTimeout(()=>setMsgBoxHeight({display:'none'}), 4000);
    }

    

    // console.log("API Manager Distributing API :" , api);

    return {
        api,
        server,
        setApi,
        apiManager,
        apierror,
        msgBoxHeight,
        errorMsgHandler
    }
};

export default useApiManager;