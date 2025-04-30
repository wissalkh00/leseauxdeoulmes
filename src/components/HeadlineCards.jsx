import React from 'react';

const HeadlineCards = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
      {/* Card 1: Sidi Ali */}
      <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Stay Hydrated</p>
          <p className='px-2'>Sidi Ali Pure Mineral Water</p>
          <button className='border-white bg-white text-[#005480] mx-2 absolute bottom-4 px-4 py-1 rounded'>
            Shop Now
          </button>
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://leseauxmineralesdoulmes-store.ma/uploads/products/sidi-ali-1-5l.jpg'
          alt='Sidi Ali 1.5L'
        />
      </div>

      {/* Card 2: Oulmès */}
      <div className='rounded-xl relative'>
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Natural Sparkle</p>
          <p className='px-2'>Try Oulmès Mineral Water</p>
          <button className='border-white bg-white text-[#005480] mx-2 absolute bottom-4 px-4 py-1 rounded'>
            Discover
          </button>
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://leseauxmineralesdoulmes-store.ma/uploads/products/oulmes-1l.jpg'
          alt='Oulmès 1L'
        />
      </div>

      {/* Card 3: Vitalya Alkaline */}
      <div className='rounded-xl relative'>
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Alkaline Boost</p>
          <p className='px-2'>Vitalya pH+ Water</p>
          <button className='border-white bg-white text-[#005480] mx-2 absolute bottom-4 px-4 py-1 rounded'>
            Try Now
          </button>
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://leseauxmineralesdoulmes-store.ma/uploads/products/vitalya-alcaline-50cl.jpg'
          alt='Vitalya Alkaline 50cl'
        />
      </div>
    </div>
  );
};

export default HeadlineCards;
