import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Menu from '../images/Menu.png'
import ButtonBackground from '../images/Buttonbackground.png'
import BrunchBackground from '../images/BrunchBackground.png'
import Cocktail1 from '../images/cocktails1.png'
import Cocktail2 from '../images/cocktail2.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MenuPage: React.FC = () => {
  const [menus, setMenus] = useState<
  Array<{ _id: string; name: string; description: string }>
>([]);

useEffect(() => {
  fetchMenuItems();
}, []);

const navigate = useNavigate();

const handleButtonClick = (menuName: string) => {
  if (menuName === 'Menu') {
    navigate('/menu');
  } else {
    navigate(`/menu`); 
  }
};

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/menu');
      setMenus(response.data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log("Menu",menus);
  
  
  return (
    <div className="container-fluid px-0  w-100  " style={{overflowX:"hidden",height:"auto",overflowY:"hidden"}} >
      {/* <h2 className="text-center mb-4">Our Menu</h2>
      <p className="text-center mb-4">Explore our delicious options here!</p> */}

      <div className="row d-flex flex-column  " >
        <div className="col-12 col-md-6 mb-4  d-flex flex-column align-items-center w-100"

        style={{background:`url(${Menu})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"346px",color:"white"}}
        >
          <h1 className="text-center">Menu</h1>
          <p className="text-center">Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.</p>
         
         <div className="d-flex  flex-row w-100 align-items-bottom justify-content-center " style={{height:"90px",position:"relative",top:"53%",
background:`url(${ButtonBackground})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"
            
         }}>
    <div className="mt-3 d-flex justify-content-center">
  {menus.length > 0 ? (
    menus.map((item) => (
      <button
        key={item._id}
        className="btn btn-primary me-3 btn-lg"
        style={{ width: '100px', height: '50px' }}
        onClick={() => handleButtonClick(item.name)} 
      >
        {item.name}
      </button>
    ))
  ) : (
    <button
      className="btn btn-primary me-3 btn-lg"
      style={{ width: '100px', height: '50px' }}
      onClick={() => handleButtonClick('Menu')}
    >
      Menu <span>&rarr;</span> 
    </button>
  )}
</div>
 
           
         </div>
          
        </div>

</div>
<div
  className="col-12 col-md-6 mb-4 w-100"
  style={{
    background: `url(${BrunchBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "640px",
  }}
>
  <div
    className="row justify-content-center align-items-center h-100"
    style={{ padding: "20px" }}
  >
    <div
      className="col-12 col-md-10 col-lg-8 p-4"
      style={{
        border: "2px solid white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="row column2">
        <div className="col-12 mb-3">
          <div className="">
          <img src={Cocktail1} alt="" height={"130px"}/>

          </div>
          <h3 className="text-center mb-4" style={{color:"white"}}>- BRUNCH COCKTAILS -</h3>
        </div>

        <div className="col-12 col-md-6 mb-3" style={{color:"white"}}>
          <h4>CINNAMON TOAST CRUNCH..........................$16</h4>
          <p>
            Skrewball peanut butter whiskey, vanilla extract, Amaretto, Baileys,
            egg white, cinnamon
          </p>
        </div>

        <div className="col-12 col-md-6 mb-3" style={{color:"white"}}>
          <h4>BAR 42 MARY................................$14</h4>
          <p>
            Titos, tomato juice, worcestershire, celery salt, black pepper,
            tabasco, fully loaded

           
          </p>
          

        </div>

        <div className="col-12 mb-3" style={{color:"white"}}>
          <h4>MOET SPRITZ..........................$20</h4>
          <p>
            Aperol, St Germain, botanical liquor, fresh lime juice, <br /> mini brut
            Moet topper
          </p>

        </div>
        <div className="" style={{position:"relative",left:"80%",bottom:"70px"}}>
          <img src={Cocktail2} alt="" height={"100px"} width={"100px"}/>

          </div>
      </div>
    </div>
  </div>
</div>

       
      </div>
    // </div>
  );
};

export default MenuPage;
