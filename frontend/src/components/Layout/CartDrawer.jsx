import React, { useState } from "react";
import CartContents from "../Cart/CartContents";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPaw, FaShoppingBag } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const [isClosing, setIsClosing] = useState(false);

  // Constants for shipping
  const FREE_SHIPPING_THRESHOLD = 50;
  const SHIPPING_CHARGE = 5.99;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleCheckout = () => {
    handleClose();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  const subtotal = cart?.products?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) || 0;

  const shippingCharge = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const total = subtotal + shippingCharge;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-[50] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[28rem] h-full bg-white shadow-2xl transform transition-all duration-300 ease-in-out z-[60] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${isClosing ? "animate-slide-out" : ""} flex flex-col`}
      >
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-pet-brown/10 bg-white/80 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-pet-brown/20 rounded-full blur-lg animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-xl p-2 transform transition-transform duration-300 group-hover:scale-110">
                    <FaShoppingBag className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-pet-brown">Your Cart</h2>
                {cart?.products?.length > 0 && (
                  <span className="bg-pet-brown/10 text-pet-brown px-2 py-1 rounded-lg text-sm font-medium">
                    {cart.products.length} {cart.products.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-pet-brown/70 hover:text-pet-brown rounded-xl hover:bg-pet-brown/5 transition-colors duration-300"
              >
                <IoMdClose className="h-6 w-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && cart?.products?.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-pet-beige/20 to-white border-b border-pet-brown/10">
                <div className="flex items-center gap-2 mb-2">
                  <MdLocalShipping className="w-5 h-5 text-pet-brown" />
                  <p className="text-sm text-pet-brown/80">
                    Add <span className="font-semibold">${remainingForFreeShipping.toFixed(2)}</span> more for Free Shipping!
                  </p>
                </div>
                <div className="h-2 bg-pet-brown/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pet-brown to-pet-brown/80 rounded-full transition-all duration-500"
                    style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cart Contents - Flex grow to take available space */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {cart && cart?.products?.length > 0 ? (
              <CartContents cartData={cart} userId={userId} guestId={guestId} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 py-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pet-brown/20 to-pet-beige/20 rounded-full blur-xl animate-pulse"></div>
                  <svg
                    className="w-24 h-24 text-pet-brown/30 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v7"
                    />
                  </svg>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-bold text-pet-brown">
                    Your cart is empty!
                  </p>
                  <p className="text-pet-brown/60">
                    Time to treat your furry friend to something special! 🐾
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleClose();
                    navigate("/collections/all");
                  }}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Start Shopping
                    <FaPaw className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Section - Always at the bottom */}
        {cart && cart?.products?.length > 0 && (
          <div className="flex-shrink-0 border-t border-pet-brown/10 bg-white/80 backdrop-blur-lg">
            {/* Order Summary */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-pet-brown/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-pet-brown/70">
                <span className="flex items-center gap-2">
                  <MdLocalShipping className="w-4 h-4" />
                  Shipping
                  {subtotal >= FREE_SHIPPING_THRESHOLD && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Free Shipping</span>
                  )}
                </span>
                <span>
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? 'Free' : `$${SHIPPING_CHARGE.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-pet-brown pt-2 border-t border-pet-brown/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-4 pt-0">
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3 bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
              >
                <span className="flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <FaPaw className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              <p className="text-sm text-pet-brown/60 text-center mt-3">
                {subtotal >= FREE_SHIPPING_THRESHOLD 
                  ? "Your order qualifies for free shipping!"
                  : `Add $${remainingForFreeShipping.toFixed(2)} more for free shipping`}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
