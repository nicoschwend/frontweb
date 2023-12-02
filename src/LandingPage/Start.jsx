import React from "react";
import "./Start.css";
import Header from "./Header";
import Body from "./Body";
import NavBar from "../General/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Start() {
    return (
        <div className="Start">
            <NavBar />
            <Body />
        </div>
    );
}

export default Start
