import React, { useState } from 'react';
import Addproduct from './Addproduct';
import ViewProducts from './ViewProducts';
import VIewallorders from './VIewallorders';

function Sidebar() {
  // State to track which component to render
  const [activeComponent, setActiveComponent] = useState('addProduct');

  // Function to handle component change
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  // Render the active component based on state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'addProduct':
        return <Addproduct />;
      case 'viewProduct':
        return <ViewProducts />;
      case 'viewallorders':
      return <VIewallorders/>
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div className="w-[10rem] h-[80vh] bg-indigo-500">
        {/* Handle component change on button click */}
        <button className={` w-full py-3 text-white font-bold hover:bg-indigo-700`} onClick={() => handleComponentChange('addProduct')}>Add Product</button>
        <button className='w-full py-3 text-white font-bold hover:bg-indigo-700' onClick={() => handleComponentChange('viewProduct')}>View Product</button>
        <button className='w-full py-3 text-white font-bold hover:bg-indigo-700' onClick={() => handleComponentChange('viewallorders')}>View all orders</button>

      </div>

      <div className="flex-grow">
        {/* Render the active component */}
        {renderComponent()}
      </div>
    </div>
  );
}

export default Sidebar;
