import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../General/navbar";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Buen click mi bro")
        console.log(email)
        console.log(password)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, 
      {
        mail: email,
        password: password,
        name: username
      }).then((response) => {
        console.log(response)
        setMsg("Usuario creado con éxito!")
      }).catch((error) => {
        console.log(error)
        setMsg(error.msg)
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
                        onChange={(e) => setEmail(e.target.value)}
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
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Nombre de Usuario:
                    </label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            <p>{msg}</p>
        </div>
    );
}

export default SignUp;
