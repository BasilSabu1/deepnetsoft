import React from "react";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap"; 
import "./header.css"; 
import Logo from "./images/Logo.png"; 

interface HeaderProps {
  logo: string; 
  navLinks: { name: string; href: string }[]; 
}

const Header: React.FC<HeaderProps> = ({ logo, navLinks }) => {
  return (
    <header className="header">
      <Navbar expand="lg" className="navbar-custom">
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="header__logo" />
          <div className="header__title">
            <span className="title__deep">DEEP</span>
            <span className="title__net">NET</span>
            <br />
            <span className="title__soft">SOFT</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" style={{background:"white"}} />         
        <Navbar.Collapse id="navbar-nav" >
          <Nav className="ms-auto ">
            {navLinks.map((link, index) => (
              <Nav.Link key={index} href={link.href} className="" style={{color:"white"}}>
                {link.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
