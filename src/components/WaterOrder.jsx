import React, { useState } from 'react';
import { data } from '../data/data.js';

const WaterOrder = () => {
  const [waters, setWaters] = useState(data);
  const [cart, setCart] = useState([]);

  // Filter by category
  const filterCategory = (category) => {
    setWaters(data.filter((item) => item.category === category));
  };

  // Filter by price
  const filterPrice = (price) => {
    setWaters(data.filter((item) => item.price === price));
  };

  // Add to cart (customizable)
  const addToCart = (water, quantity, size, extras) => {
    const newItem = { ...water, quantity, size, extras };
    setCart([...cart, newItem]);
  };

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-[#005480] font-bold text-4xl text-center'>
        Customize Your Water Order
      </h1>

      {/* Filter Row */}
      <div className='flex flex-col lg:flex-row justify-between mt-6'>
        {/* Filter Type */}
        <div>
          <p className='font-bold text-black mb-2'>Filter Type</p>
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => setWaters(data)}
              className='border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              All
            </button>
            <button
              onClick={() => filterCategory('still')}
              className='border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Still
            </button>
            <button
              onClick={() => filterCategory('sparkling')}
              className='border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Sparkling
            </button>
            <button
              onClick={() => filterCategory('flavored')}
              className='border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Flavored
            </button>
            <button
              onClick={() => filterCategory('mineral')}
              className='border-[#005480] text-[#005480] hover:bg-[#005480] hover:text-white px-4 py-1 rounded'
            >
              Mineral
            </button>
          </div>
        </div>

        {/* Filter Price */}
        <div>
          <p className='font-bold text-black mb-2'>Filter Price</p>
          <div className='flex flex-wrap gap-2'>
            <button onClick={() => filterPrice('$')} className='border-[#2A8B57] text-[#2A8B57] hover:bg-[#2A8B57] hover:text-white px-4 py-1 rounded'>$</button>
            <button onClick={() => filterPrice('$$')} className='border-[#2A8B57] text-[#2A8B57] hover:bg-[#2A8B57] hover:text-white px-4 py-1 rounded'>$$</button>
            <button onClick={() => filterPrice('$$$')} className='border-[#2A8B57] text-[#2A8B57] hover:bg-[#2A8B57] hover:text-white px-4 py-1 rounded'>$$$</button>
            <button onClick={() => filterPrice('$$$$')} className='border-[#2A8B57] text-[#2A8B57] hover:bg-[#2A8B57] hover:text-white px-4 py-1 rounded'>$$$$</button>
          </div>
        </div>
      </div>

      {/* Display water products */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6'>
        {waters.map((item, index) => (
          <div key={index} className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
            <img src={item.image} alt={item.name} className='w-full h-[200px] object-cover rounded-t-lg' />
            <div className='px-2 py-4'>
              <p className='font-bold text-black'>{item.name}</p>
              <p>
                <span className='bg-[#2A8B57] text-white p-1 rounded-full'>
                  {item.price}
                </span>
              </p>

              {/* Quantity */}
              <div className='mt-2'>
                <label className='text-[#005480] font-bold'>Quantity: </label>
                <input type='number' min='1' defaultValue='1' className='border rounded p-1 w-16' />
              </div>

              {/* Size */}
              <div className='mt-2'>
                <label className='text-[#005480] font-bold'>Size: </label>
                <select className='border rounded p-1 w-full'>
                  <option value='330ml'>330ml</option>
                  <option value='500ml'>500ml</option>
                  <option value='1L'>1L</option>
                  <option value='1.5L'>1.5L</option>
                </select>
              </div>

              {/* Extras (optional like lemon, mint) */}
              <div className='mt-2'>
                <label className='text-[#005480] font-bold'>Extras: </label>
                <select className='border rounded p-1 w-full'>
                  <option value='None'>None</option>
                  <option value='Lemon'>Lemon</option>
                  <option value='Mint'>Mint</option>
                  <option value='Ice'>Ice</option>
                </select>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(item, 1, '500ml', 'None')}
                className='mt-4 bg-[#005480] text-white p-2 rounded-lg hover:bg-[#003d5c] w-full'
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterOrder;