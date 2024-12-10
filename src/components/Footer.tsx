import React from 'react';
import './footer.css'; 
import Logo from "../images/Logo.png"; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section" style={{border:"2px solid white",borderRadius:"6px"}}>
        <h4>CONNECT WITH US</h4>
        <p>
          <span role="img" aria-label="phone"><i className="fa-solid fa-phone"></i></span> +91 9567843340
        </p>
        <p>
          <span role="img" aria-label="email"><i className="fa-solid fa-envelope"></i></span> info@deepnetsoft.com
        </p>
      </div>

      <div className="footer-section" style={{border:"2px solid white",borderRadius:"6px",height:"150px"}}>
        <div className="footer-logo">
          <img src={Logo} alt="Deep Net Soft Logo" width={"86px"} height={""}/>
        </div>
        <h4>DEEP NET SOFT</h4>
        <div className="social-media-icons " style={{position:"relative",bottom:"30px"}}>
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook-f" style={{fontSize:"15px"}}></i>
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-twitter"  style={{fontSize:"15px"}}></i>
  </a>
  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-youtube" style={{fontSize:"15px"}}></i>
  </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram" style={{fontSize:"15px"}}></i>
  </a>
</div>

      </div>

      <div className="footer-section" style={{border:"2px solid white",borderRadius:"6px"}}>
        <h4>FIND US</h4>
        <p>
          <span role="img" aria-label="location"><i className="fa-solid fa-location-dot"></i></span> First Floor, Geo Infopark, <br />
          Infopark EXPY, Kakkanad
        </p>
      </div>
    </footer>
  );
};

export default Footer;