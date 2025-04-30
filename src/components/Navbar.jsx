import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import { BsFillCartFill, BsFillSaveFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaUserFriends, FaWallet } from 'react-icons/fa';
import { MdFavorite, MdHelp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const goToCustomization = () => {
    navigate(`/cart`);
  };

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
      {/* Left side */}
      <div className='flex items-center'>
        <div onClick={() => setNav(!nav)} className='cursor-pointer'>
          <AiOutlineMenu size={30} />
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
          <span className='font-bold text-[#005480]'>Hydro</span>
          <span className='text-[#2A8B57]'>Fresh</span>
        </h1>
        <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
          <p className='bg-[#005480] text-white rounded-full p-2'>Delivery</p>
          <p className='p-2'>Pickup</p>
        </div>
      </div>

      {/* Search Input */}
      <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
        <AiOutlineSearch size={25} className='text-[#005480]' />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search water products'
        />
      </div>

      {/* Cart button */}
      <button
        onClick={goToCustomization}
        className='bg-[#005480] text-white hidden md:flex items-center py-2 px-4 rounded-full hover:bg-[#004261] transition'
      >
        <BsFillCartFill size={20} className='mr-2' /> Cart
      </button>

      {/* Mobile Menu Overlay */}
      {nav && <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0' />}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 ${
          nav ? 'left-0' : 'left-[-100%]'
        }`}
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4 text-[#005480] font-bold'>HydroFresh</h2>
        <nav>
          <ul className='flex flex-col p-4 text-gray-800'>
            <li className='text-xl py-4 flex' onClick={goToCustomization}>
              <BsFillCartFill size={25} className='mr-4 text-[#005480]' /> Cart
            </li>
            <li className='text-xl py-4 flex'>
              <TbTruckDelivery size={25} className='mr-4 text-[#2A8B57]' /> Orders
            </li>
            <li className='text-xl py-4 flex'>
              <MdFavorite size={25} className='mr-4 text-red-500' /> Favorites
            </li>
            <li className='text-xl py-4 flex'>
              <FaWallet size={25} className='mr-4 text-[#005480]' /> Wallet
            </li>
            <li className='text-xl py-4 flex'>
              <MdHelp size={25} className='mr-4 text-gray-500' /> Help
            </li>
            <li className='text-xl py-4 flex'>
              <AiFillTag size={25} className='mr-4 text-yellow-600' /> Promotions
            </li>
            <li className='text-xl py-4 flex'>
              <BsFillSaveFill size={25} className='mr-4 text-green-600' /> Best Picks
            </li>
            <li className='text-xl py-4 flex'>
              <FaUserFriends size={25} className='mr-4 text-[#2A8B57]' /> Invite Friends
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
