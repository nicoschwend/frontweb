import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

function UserCheck(){
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    const config = {
        'method' : 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`,
        'headers': {
            'Authorization' : `Bearer ${token}`
        } 
    }

    useEffect(() => {
        axios(config).then((response) => {
            console.log("LOGEADO CORRECTO A RUTA PROTEGIDA!");
            console.log(response);
            setMsg(response.data.msj);
        }).catch((error) => {
            console.log("No estas logeado en la pagina");
            console.log(error);
            setMsg(error.message);
        })
    }, [])

    return (
        <div>
        <h2>Esta es una Ruta muy Secreta</h2>
        <h3>{msg}</h3>
        </div>
    );
}

export default UserCheck;