import React from "react";
import { Button } from "react-bootstrap";


function Header() {
  return (
    <div className="Header">
      <div className="Logo">
        <h1>Calendario 100</h1>
      </div>
      <div>
        <Button variant="primary" style={{marginRight: '30px'}}>Sign In</Button>
        <Button variant="success">Sign Up</Button>
      </div>
    </div>
  );
}

export default Header;

