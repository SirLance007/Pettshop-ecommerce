import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { FaPaw, FaBone, FaHome, FaPhone, FaEnvelope, FaTruck } from "react-icons/fa";
import { MdPets, MdLocalShipping } from "react-icons/md";
import axios from "axios";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const petEmojis = ['🐕', '🐈', '🐇', '🦜', '🐠', '🐹'];
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  // Constants for shipping
  const FREE_SHIPPING_THRESHOLD = 50;
  const SHIPPING_CHARGE = 5.99;

  // Calculate shipping and total
  const subtotal = cart?.totalPrice || 0;
  const shippingCharge = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const total = subtotal + shippingCharge;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPetIndex((prev) => (prev + 1) % petEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
      return;
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const shippingAddressPayload = {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      };
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: shippingAddressPayload,
          paymentMethod: "PayPal",
          subtotal: subtotal,
          shippingCharge: shippingCharge,
          totalPrice: total,
          paymentDetails: {},
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
    navigate("/order-confirmation");
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-pet-brown text-xl animate-bounce flex items-center gap-2">
        Loading <FaPaw className="animate-spin" />
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-xl flex items-center gap-2">
        Error: {error} <span className="animate-bounce">😿</span>
      </div>
    </div>
  );
  
  if (!cart || !cart.products || cart.products.length === 0) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-pet-brown text-xl flex flex-col items-center gap-4">
        <span className="text-4xl animate-bounce">🛍️</span>
        <p>Your cart is empty</p>
        <button 
          onClick={() => navigate('/collections/all')}
          className="mt-4 px-6 py-3 bg-pet-brown text-white rounded-xl hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          Continue Shopping <FaPaw />
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto py-10 px-2 sm:px-6 gap-8 min-h-screen">
      {/* Checkout Form */}
      <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-2xl border border-pet-brown/20 animate-fade-in-up delay-100 relative overflow-hidden group">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <FaPaw className="absolute top-4 right-4 text-pet-brown/10 w-8 h-8 animate-float" />
          <FaBone className="absolute bottom-4 left-4 text-pet-brown/10 w-6 h-6 animate-float delay-100" />
          <FaPaw className="absolute top-1/2 left-8 text-pet-brown/10 w-4 h-4 animate-float delay-200" />
        </div>

        <h2 className="text-3xl font-extrabold mb-8 text-pet-brown tracking-tight flex items-center gap-3 relative">
          <MdPets className="w-8 h-8 animate-bounce-gentle" />
          Checkout
          <span className="text-2xl animate-bounce-gentle absolute -top-2 -right-2">
            {petEmojis[currentPetIndex]}
          </span>
        </h2>

        <form onSubmit={handleCreateCheckout} className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-pet-brown flex items-center gap-2 relative">
              <FaEnvelope className="w-5 h-5" />
              Contact Details
              <div className="absolute left-0 -bottom-1 w-20 h-0.5 bg-pet-brown/20"></div>
            </h3>
            <div className="mb-6">
              <label className="block text-pet-brown mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                value={user ? user.email : ""}
                className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                disabled
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-pet-brown flex items-center gap-2 relative">
              <FaTruck className="w-5 h-5" />
              Delivery Details
              <div className="absolute left-0 -bottom-1 w-28 h-0.5 bg-pet-brown/20"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-pet-brown mb-1 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                  required
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-pet-brown mb-1 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                  required
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-pet-brown mb-1 font-medium flex items-center gap-2">
                  <FaHome className="w-4 h-4" />
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                  required
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-pet-brown mb-1 font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                    required
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-pet-brown mb-1 font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-pet-brown mb-1 font-medium">
                    Country
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                    required
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-pet-brown mb-1 font-medium flex items-center gap-2">
                    <FaPhone className="w-4 h-4" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-pet-brown/20 rounded-xl bg-pet-beige/10 text-pet-brown focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Continue to Payment</span>
            <FaPaw className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-2xl border border-pet-brown/20 h-fit lg:sticky lg:top-24">
        <h3 className="text-2xl font-bold mb-6 text-pet-brown flex items-center gap-2">
          <FaBone className="w-5 h-5 animate-bounce-gentle" />
          Order Summary
        </h3>

        <div className="space-y-4 mb-6">
          {cart.products.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 p-4 rounded-xl bg-pet-beige/10 border border-pet-brown/10 group hover:border-pet-brown/30 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md transform group-hover:rotate-2 transition-transform duration-300"
              />
              <div className="flex-1">
                <h4 className="font-medium text-pet-brown">{item.name}</h4>
                <p className="text-sm text-pet-brown/60">Quantity: {item.quantity}</p>
              </div>
              <p className="font-bold text-pet-brown">${item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-pet-brown/10 pt-4 space-y-2">
          <div className="flex justify-between text-pet-brown">
            <span>Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-pet-brown">
            <span className="flex items-center gap-2">
              <MdLocalShipping className="w-5 h-5" />
              Shipping
              {subtotal >= FREE_SHIPPING_THRESHOLD && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Free Shipping</span>
              )}
            </span>
            <span className="font-bold">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? 'Free' : `$${SHIPPING_CHARGE.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold text-pet-brown pt-2 border-t border-pet-brown/10">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {checkoutId && (
          <div className="mt-6">
            <PayPalButton
              amount={total}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
