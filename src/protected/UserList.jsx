import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";



function UsersList2(){
  const {token} = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState(Array('pikachu'));

  const config = {
      'method' : 'get',
      'url': `${import.meta.env.VITE_BACKEND_URL}/users`,
      'headers': {
          'Authorization' : `Bearer ${token}`
      } 
  }
  useEffect(() => {
    axios(config).then((response) => {
        console.log("LOGEADO CORRECTO A RUTA PROTEGIDA!");
        console.log(response);
        const data = response.data;
        setUsers(data);
        console.log(users);
    }).catch((error) => {
        console.log("No estas logeado en la pagina");
        console.log(error);
        setMsg(error.message);
    })
}, [])

    return (
        <div>
        <h2>Lista de usuarios Registrados en la página</h2>
        <h3>Esta es información delicada, por lo que solo los admins tienen acceso.</h3>
        <ul>{users.map((user, index) => (
          <li key={index}>{user.name} {user.password}</li>

        ))}</ul>
        </div>
    );
}

export default UsersList2;