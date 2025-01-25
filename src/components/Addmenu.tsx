import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuForm: React.FC = () => {
  const [menuName, setMenuName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [menus, setMenus] = useState<
  Array<{ id: string; name: string; description: string }>
>([]);

  const [submenuModal, setSubmenuModal] = useState<boolean>(false); 
  const [selectedMenuId, setSelectedMenuId] = useState<string>(''); // Always a string

  const [submenuName, setSubmenuName] = useState<string>(''); 
  const [submenuDescription, setSubmenuDescription] = useState<string>(''); 
  const [submenuPrice, setSubmenuPrice] = useState<number>(0); 
  const [subviewmenuModal, setsubviewmenuModal] = useState<boolean>(false); 

  const [submenuItems, setSubmenuItems] = useState<
  Array<{ id: string; name: string; description: string; price: number }>
>([]);

const fetchSubmenuItems = async (Id: string) => {
  try {
    const response = await axios.get(`https://restaurantmenuappserver-production.up.railway.app/menu/${Id}`);
    console.log('response',response);
    
    setSubmenuItems(response.data.submenus); // Update state with submenu items
  } catch (error) {
    console.error('Error fetching submenu items:', error);
  }
};

console.log(submenuItems);

console.log('submenuitems',submenuItems);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('https://restaurantmenuappserver-production.up.railway.app/menu');
      setMenus(response.data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log('menu',menus);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://restaurantmenuappserver-production.up.railway.app/menu', {
        name: menuName,
        description,
      });

      if (response.status === 201) {
        toast.success('Menu item added successfully!');
        setMenuName('');
        setDescription('');
        setShowModal(false); 
        fetchMenuItems(); 
      }
    } catch (error) {
      toast.error('Error adding menu item. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleSubmenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Construct the payload with submenu details
    const submenuData = {
      itemName: submenuName,
      description: submenuDescription,
      price: submenuPrice,
      menuId: selectedMenuId, // Use the menu ID associated with the submenu
    };
    console.log(submenuData);
    
  
    try {
      // Make a POST request to the submenu API
      const response = await axios.post('https://restaurantmenuappserver-production.up.railway.app/submenu', submenuData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        toast.success('Submenu added successfully!');
        setSubmenuName('');
        setSubmenuDescription('');
        setSubmenuPrice(0);
        setSubmenuModal(false);  // Close the modal after submission
        fetchSubmenuItems(selectedMenuId);  // Fetch submenu items for the selected menu
      }
    } catch (error) {
      toast.error('Error adding submenu. Please try again.');
      console.error('Error:', error);
    }
  
    console.log('selected id', selectedMenuId);
  };
  

  const handleMenuDelete = async () => {
    console.log(selectedMenuId);
    
    try {
      const response = await axios.delete(`https://restaurantmenuappserver-production.up.railway.app/menu/${selectedMenuId}`);
      if (response.status === 200) {
        toast.success('Menu item deleted successfully!');
        fetchMenuItems(); 
      }
    } catch (error) {
      toast.error('Error deleting menu item. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleSubmenuDelete = async (menuId: string, submenuId: string) => {
    try {
      const response = await axios.delete(
        `https://restaurantmenuappserver-production.up.railway.app/menu/${menuId}/item/${submenuId}`
      );
      if (response.status === 200) {
        toast.success('Submenu deleted successfully!');
        fetchMenuItems(); 
      }
    } catch (error) {
      toast.error('Error deleting submenu. Please try again.');
      console.error('Error:', error);
    }
  };
  console.log(selectedMenuId);
  

  const handleViewSubmenu = (id: string) => {
    setSelectedMenuId(id); 
    fetchSubmenuItems(id); 
    setsubviewmenuModal(true); 
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div style={{ display:"flex",alignItems:"center",justifyContent:"center" ,marginTop:"20px"}}>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Menu Item
        </button>
      </div>

      {showModal && (
        <>
          <div className="modal show d-block" tabIndex={-1} role="dialog" >
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Menu Item</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="menuName" className="form-label">
                        Menu Name
                      </label>
                      <input
                        type="text"
                        id="menuName"
                        className="form-control"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary w-100">
                        Add Menu Item
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop show"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      )}

{submenuModal && (
        <>
          <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Submenu Item </h5>
                 


                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmenuSubmit}>
                    <div className="mb-3">
                      <label htmlFor="submenuName" className="form-label">
                        Submenu Name
                      </label>
                      <input
                        type="text"
                        id="submenuName"
                        className="form-control"
                        value={submenuName}
                        onChange={(e) => setSubmenuName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="submenuDescription" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="submenuDescription"
                        className="form-control"
                        value={submenuDescription}
                        onChange={(e) => setSubmenuDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="submenuPrice" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        id="submenuPrice"
                        className="form-control"
                        value={submenuPrice}
                        onChange={(e) => setSubmenuPrice(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                    <button
    className="btn btn-primary ms-3"
    onClick={() => {
      if (selectedMenuId) {
        setSubmenuModal(true); 
      } else {
        console.log('Please select a menu first.');
      }
    }}
  >
    Add Submenu
  </button>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop show"
            onClick={() => setSubmenuModal(false)}
          ></div>
        </>
      )}

{subviewmenuModal && (
  <>
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Submenu Items</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setsubviewmenuModal(false)} 
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {submenuItems.length === 0 ? (
                <p>No submenu items available.</p>
              ) : (
                submenuItems.map((item) => (
                  <div key={item.id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="modal-backdrop show"></div>
  </>
)}


        <div className="container mt-5" style={{overflowX:"hidden"}}>
        <h3>Menu List</h3>
        <div className="row">
          {menus.length === 0 ? (
            <p>No menu items available.</p>
          ) : (
            menus.map((menu) => (
              <div key={menu.id} className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{menu.name}</h5>
                    <p className="card-text">{menu.description}</p>
                    <div className="" style={{position:"relative",top:"-80px",left:"250px"}}>
                    {/* <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleMenuDelete(menu.id)}
                      >
                        <i className="fas fa-trash"></i> 
                      </button> */}
                      {/* <button
      key={menu.id}
      className="btn btn-sm btn-primary"
      onClick={() => {
        setSelectedMenuId(menu.id); 
      }}
    >
      <i className="fas fa-trash"></i>
    </button> */}

                    </div>
                   
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedMenuId(menu.id);
                          setSubmenuModal(true); 
                        }}
                      >
                        Add Submenu
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleViewSubmenu(menu.id)}
                      >
                        View Submenu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MenuForm;
