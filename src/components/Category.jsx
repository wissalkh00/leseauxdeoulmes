import React from 'react';
import { categories } from '../data/data.js';

const Category = () => {
  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-[#005480] font-bold text-4xl text-center'>
        Explore Our Water Categories
      </h1>

      {/* Categories */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-6'>
        {categories.map((item, index) => (
          <div
            key={index}
            className='bg-white border border-[#e0f2f1] rounded-2xl p-4 flex flex-col items-center justify-center shadow hover:shadow-md transition-all duration-200'
          >
            <img src={item.image} alt={item.name} className='w-20 h-20 object-contain mb-4' />
            <h2 className='text-[#2A8B57] font-semibold text-center text-lg'>
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
