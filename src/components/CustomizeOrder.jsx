import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { data } from '../data/data.js';
import { FaArrowLeft } from 'react-icons/fa';

const CustomizeOrder = ({ cart, setCart }) => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const meal = data.find((item) => item.id === parseInt(mealId));

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('500ml');
  const [extras, setExtras] = useState('None');
  const [totalPrice, setTotalPrice] = useState(0);

  // Pricing logic
  const sizePrices = {
    '330ml': 0,
    '500ml': 2,
    '1L': 4,
    '1.5L': 6,
  };

  const extrasPrices = {
    None: 0,
    Lemon: 1,
    Mint: 1.2,
    Ice: 0.5,
  };

  const calculateTotalPrice = () => {
    const mealBase = meal.price * quantity;
    const sizeExtra = sizePrices[size] * quantity;
    const extrasPrice = extrasPrices[extras] * quantity;
    return mealBase + sizeExtra + extrasPrice;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [quantity, size, extras]);

  const addToCart = () => {
    const order = { ...meal, quantity, size, extras, totalPrice };
    setCart([...cart, order]);
    navigate('/');
  };

  const goBack = () => navigate(-1);

  return (
    <div className='max-w-[1400px] mx-auto relative'>
      <button
        onClick={goBack}
        className='bg-gray-100 hover:bg-gray-200 block lg:hidden absolute top-4 left-4 p-2 rounded-full shadow-md transition'
      >
        <FaArrowLeft className="text-[#005480]" />
      </button>

      <div className='bg-white shadow-2xl rounded-3xl p-10 md:flex transition hover:scale-[1.01] duration-300'>
        {/* Left Side - Product Info */}
        <div className='md:w-1/2'>
          <img
            src={meal.image}
            alt={meal.name}
            className='w-full h-[350px] object-cover rounded-xl shadow-md'
          />
          <h2 className='text-4xl font-extrabold text-[#005480] mt-8'>{meal.name}</h2>
          <p className='text-base text-gray-500 mt-2 capitalize'>{meal.category}</p>
          <p className='text-lg text-gray-700 mt-4 leading-relaxed'>{meal.description}</p>
          <p className='text-[#2A8B57] text-3xl font-bold mt-6'>{meal.price?.toFixed(2)} DH</p>
        </div>

        {/* Right Side - Customization */}
        <div className='md:w-1/2 md:ml-12 mt-8 md:mt-0'>
          <h3 className='text-2xl font-semibold text-[#005480] mb-6'>Customize Your Order</h3>

          {/* Quantity */}
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700'>Quantity</label>
            <div className='flex items-center mt-3'>
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className='w-12 h-12 bg-gray-200 text-gray-800 text-xl font-bold rounded-full hover:bg-gray-300 transition'
              >
                -
              </button>
              <input
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='mx-4 w-16 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8B57] transition'
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='w-12 h-12 bg-gray-200 text-gray-800 text-xl font-bold rounded-full hover:bg-gray-300 transition'
              >
                +
              </button>
            </div>
          </div>

          {/* Size Selector */}
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700'>Select Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className='mt-3 block w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[#2A8B57] transition'
            >
              <option value='330ml'>330ml (+0)</option>
              <option value='500ml'>500ml (+2)</option>
              <option value='1L'>1L (+4)</option>
              <option value='1.5L'>1.5L (+6)</option>
            </select>
          </div>

          {/* Extras Selector */}
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700'>Select Extras</label>
            <select
              value={extras}
              onChange={(e) => setExtras(e.target.value)}
              className='mt-3 block w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[#2A8B57] transition'
            >
              <option value='None'>None (+0)</option>
              <option value='Lemon'>Lemon (+1)</option>
              <option value='Mint'>Mint (+1.2)</option>
              <option value='Ice'>Ice (+0.5)</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className='w-full bg-gradient-to-r from-[#2A8B57] to-[#005480] text-white font-bold py-4 rounded-xl hover:from-[#237851] hover:to-[#004261] transition'
          >
            Add to Cart ({totalPrice.toFixed(2)} DH)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeOrder;
