import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentMethodModal from "./PaymentMethodModal";
import { FaArrowLeft } from "react-icons/fa";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const goBack = () => {
    navigate(-1);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button
        onClick={goBack}
        className="border-transparent bg-transparent block lg:hidden absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md transition-all"
      >
        <FaArrowLeft className="text-[#005480]" />
      </button>

      <h1 className="text-4xl md:text-5xl font-extrabold text-[#005480] text-center mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">Your cart is empty.</div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-200 py-4 last:border-b-0"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg shadow-md mr-4"
                />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 mt-1">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Extras: {item.extras}</p>
                  <p className="text-[#2A8B57] font-bold mt-2">
                    Price: {item.totalPrice.toFixed(2)} DH
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#005480]">
              Total Price: {getTotalPrice()} DH
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#2A8B57] to-[#005480] text-white text-lg font-bold py-3 px-6 rounded-lg shadow-md hover:from-[#237851] hover:to-[#004261] transition-all duration-200 mt-4 sm:mt-0"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clearCart={clearCart}
        amount={getTotalPrice()}
      />
    </div>
  );
};

export default Cart;
