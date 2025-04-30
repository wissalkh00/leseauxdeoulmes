import React from 'react';

const Hero = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4'>
      <div className='max-h-[500px] relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full text-white max-h-[500px] bg-black/40 flex flex-col justify-center'>
          <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
            Pure <span className='text-[#2A8B57]'>Hydration</span>,
          </h1>
          <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
            Delivered <span className='text-[#005480]'>Fresh</span>
          </h1>
        </div>
        <img
          className='w-full max-h-[500px] object-cover rounded-xl'
          src='https://leseauxmineralesdoulmes-store.ma/uploads/products/sidi-ali-1-5l.jpg'
          alt='Sidi Ali Hero'
        />
      </div>
    </div>
  );
};

export default Hero;
