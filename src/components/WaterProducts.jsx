import React, { useState } from 'react';
import { data } from '../data/data.js';
import { useNavigate } from 'react-router-dom';

const WaterProducts = () => {
  const [waters, setWaters] = useState(data);
  const navigate = useNavigate();

  // Filter by category (e.g., still, sparkling)
  const filterCategory = (category) => {
    setWaters(data.filter((item) => item.category === category));
  };

  // Navigate to product detail/customization
  const goToCustomization = (waterId) => {
    navigate(`/${waterId}`);
  };

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-[#005480] font-bold text-4xl text-center'>
        Top Rated Water Products
      </h1>

      {/* Filter Row */}
      <div className='flex flex-col lg:flex-row justify-between mt-6'>
        {/* Filter by Type */}
        <div>
          <p className='font-bold text-black mb-2'>Filter Type</p>
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => setWaters(data)}
              className='m-1 border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              All
            </button>
            <button
              onClick={() => filterCategory('still')}
              className='m-1 border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Still
            </button>
            <button
              onClick={() => filterCategory('sparkling')}
              className='m-1 border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Sparkling
            </button>
            <button
              onClick={() => filterCategory('flavored')}
              className='m-1 border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Flavored
            </button>
            <button
              onClick={() => filterCategory('mineral')}
              className='m-1 border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Mineral
            </button>
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6'>
        {waters.map((item, index) => (
          <div
            key={index}
            onClick={() => goToCustomization(item.id)}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300 cursor-pointer'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold text-black'>{item.name}</p>
              <p>
                <span className='bg-[#2A8B57] text-white p-1 rounded-full'>
                  {item.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterProducts;
