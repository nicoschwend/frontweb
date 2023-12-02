import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import NavBar from "../General/navbar";
import { AuthContext } from "../auth/AuthContext";

function SignIn() {
    const {token, setToken} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Buen click mi bro")
        console.log(email)
        console.log(password)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, 
      {
        mail: email,
        password: password
      }).then((response) => {
        console.log(response)
        const access_token = response.data.access_token;
        setMsg("Hiciste Login con éxito!");
        setToken(access_token);
      }).catch((error) => {
        console.log(error)
        setMsg("Contraseña incorrecta, o usuario no existe.")
      })
    };

    return (
        <div className="container">
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)
                        }
                        autoComplete="on"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="on"
                    />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <p>{msg}</p>
        </div>
    );
}

export default SignIn;
