import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";  
import Header from "./components/Header.tsx"; 
import MenuPage from "./components/Menu.tsx"; 
import Addmenu from "./components/Addmenu.tsx"; 
import Footer from "./components/Footer.tsx"; 
import Logo from "./images/Logo.png";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <MenuPage /> },
    { path: "/menu", element: <Addmenu/> },
  ]);

  return routes;
};

const App: React.FC = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Make A Reservation", href: "/reservation" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <Router>
      <div>
        <Header logo={Logo} navLinks={navLinks} />
        <main>
          <AppRoutes /> 
        </main>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
