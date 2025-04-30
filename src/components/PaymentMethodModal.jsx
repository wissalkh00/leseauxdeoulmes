import React, { useEffect, useRef, useState } from 'react';
import { AiFillCreditCard } from 'react-icons/ai';
import { FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import $ from 'jquery';

const PaymentMethodModal = ({ isOpen, onClose, clearCart, amount }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [success, setSuccess] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      clearCart();
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handlePaymentMethodSelect = async (method) => {
    if (method === 'balance') {
      var ServerToken;
      $.ajax({
        url: 'https://pub-sg.appcubecloud.com/baas/auth/v1.0/oauth2/token',
        method: 'POST',
        async: false,
        data: {
          client_id: "7501c5cc9ad0add2bcd70d1b6c997508",
          client_secret: "4004a4e1a4bcbcb3c891341839131706e66adb14b15fccf9",
          grant_type: "client_credentials"
        },
        success: function (response) {
          ServerToken = response.access_token;
          window.xm.native("gethwssostring", {}).then((res) => {
            var AuthCode = res;
            $.ajax({
              url: 'https://dev-sg.appcubecloud.com/service/handsome__Login/0.0.1/Login',
              method: 'POST',
              async: false,
              headers: {
                'Content-Type': "application/json",
                'access-token': ServerToken
              },
              data: JSON.stringify({ authCode: AuthCode }),
              success: function (response) {
                window.accesstoken = response.result['access-token'];
                $.ajax({
                  url: 'https://dev-sg.appcubecloud.com/service/N2851324044__BillPaymentsCableTV/1.0.0/placeOrderService',
                  method: 'POST',
                  async: false,
                  headers: {
                    'Content-Type': "application/json",
                    'access-token': window.accesstoken
                  },
                  data: JSON.stringify({ title: "Bill", total_amount: amount }),
                  success: function (response) {
                    let rawRequest = response.result.rawRequest.toString();
                    window.xm.native('startPay', { rawRequest });
                    setSuccess(true);
                  },
                  error: function (xhr, status, error) {
                    console.log(error);
                  }
                });
              },
              error: function () {
                console.log('AppToken create fail');
              }
            });
          }).catch((e) => {
            console.log("e ", e);
          });
        },
        error: function () {
          console.log('Token create fail');
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-t-2xl w-full max-w-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-[#005480] text-center">Choose Payment Method</h2>
          <div className="flex flex-col mt-6 space-y-3">
            <div onClick={() => handlePaymentMethodSelect('balance')} className="flex items-center p-3 border rounded cursor-pointer hover:bg-[#e6f7f6] transition">
              <FaWallet className="text-[#2A8B57] text-xl" />
              <span className="ml-4 text-gray-800 font-medium">My Balance</span>
            </div>
            <div onClick={() => handlePaymentMethodSelect('card')} className="flex items-center p-3 border rounded cursor-pointer hover:bg-[#e6f7f6] transition">
              <AiFillCreditCard className="text-[#005480] text-xl" />
              <span className="ml-4 text-gray-800 font-medium">Debit Card</span>
            </div>
            <div onClick={() => handlePaymentMethodSelect('cash')} className="flex items-center p-3 border rounded cursor-pointer hover:bg-[#e6f7f6] transition">
              <FaMoneyBillWave className="text-yellow-600 text-xl" />
              <span className="ml-4 text-gray-800 font-medium">Pay Cash</span>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-3/4 max-w-sm bg-white rounded-lg p-6 text-center shadow-xl">
            <h2 className="text-xl font-bold text-[#2A8B57]">Payment Successful!</h2>
            <p className="text-gray-600 mt-2">Your payment has been processed successfully.</p>
            <button
              onClick={() => {
                onClose();
                setSuccess(false);
              }}
              className="mt-6 px-6 py-2 bg-[#2A8B57] text-white rounded-lg hover:bg-[#237851] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodModal;
