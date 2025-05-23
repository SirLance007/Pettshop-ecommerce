import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import celebrationAnimation from "../assets/celebration.json";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { getAllOrders } from "../redux/slices/orderSlice";

const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);
    const [activeTab, setActiveTab] = useState('summary');

    // Clear the cart whe the order is confirmed
    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
            dispatch(getAllOrders()); // Refresh orders after confirmation
        } else {
            navigate("/my-order");
        }
    }, [checkout, dispatch, navigate]);

    const [showContent, setShowContent] = useState(false);
    const [showLottie, setShowLottie] = useState(true);

    useEffect(() => {
        setShowContent(false);
        setShowLottie(true);
        // Show Lottie for 2.5 seconds, then show main content
        const lottieTimeout = setTimeout(() => {
            setShowLottie(false);
            setShowContent(true);
        }, 2500);
        return () => clearTimeout(lottieTimeout);
    }, []);

    const calculateEstimateDelivery = (createAt) => {
        const orderDate = new Date(createAt);
        orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to the order date
        return orderDate.toLocaleDateString();
    };

    // Animation variants for different pet emojis
    const petEmojis = ['🐕', '🐈', '🐇', '🦜', '🐠', '🐹'];
    const [currentPetIndex, setCurrentPetIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPetIndex((prev) => (prev + 1) % petEmojis.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pet-beige via-white to-pet-beige/30">
            {/* Enhanced Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="paw-print absolute top-20 left-10 opacity-10 animate-float">🐾</div>
                <div className="paw-print absolute top-40 right-20 opacity-10 animate-float-delayed">🐾</div>
                <div className="paw-print absolute bottom-20 left-1/4 opacity-10 animate-float">🐾</div>
                <div className="paw-print absolute top-1/3 right-1/4 opacity-10 animate-float-delayed">🐾</div>
                <div className="bone absolute top-1/4 left-1/3 opacity-10 animate-spin-slow">🦴</div>
                <div className="bone absolute bottom-1/4 right-1/3 opacity-10 animate-spin-slow-delayed">🦴</div>
                {/* Additional animated elements */}
                <div className="absolute top-1/2 left-10 opacity-20 animate-bounce-gentle text-4xl">🎾</div>
                <div className="absolute bottom-1/3 right-10 opacity-20 animate-spin-slow text-4xl">🪀</div>
                <div className="absolute top-20 right-1/4 opacity-20 animate-pulse text-4xl">🐟</div>
            </div>

            {showLottie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
                    <div className="w-full h-full flex items-center justify-center">
                        <Lottie
                            animationData={celebrationAnimation}
                            loop={false}
                            style={{ width: "100vw", height: "100vh" }}
                        />
                    </div>
                </div>
            )}

            {showContent && (
                <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col items-center animate-fade-in">
                    <div className="w-full bg-white/90 rounded-3xl shadow-2xl p-8 mt-10 animate-fade-in-up overflow-visible relative">
                        {/* Decorative Corner Elements */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform rotate-12 animate-spin-slow">
                            <span className="text-2xl">{petEmojis[currentPetIndex]}</span>
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform -rotate-12 animate-spin-slow">
                            <span className="text-2xl">🦴</span>
                        </div>

                        {/* Enhanced Header Section */}
                        <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-center items-center mb-4 relative">
                                <div className="absolute inset-0 flex items-center justify-center filter blur-sm opacity-30">
                                    <span className="text-6xl animate-pulse">🐾</span>
                                </div>
                                <span className="text-5xl animate-bounce-gentle relative">🐾</span>
                                <h2 className="text-3xl font-extrabold text-pet-brown ml-3 relative z-10">
                                    PetPal
                                    <span className="absolute -top-1 -right-2 text-sm animate-bounce">🌟</span>
                                </h2>
                            </div>
                            <h1 className="text-4xl font-bold text-pet-brown mb-2 relative">
                                Pawsome News!
                                <span className="absolute -top-2 -right-2 text-sm animate-spin-slow">✨</span>
                            </h1>
                            <p className="text-pet-brown/60">Your order is confirmed and on its way to your furry friend</p>
                        </div>

                        {/* Interactive Navigation Tabs */}
                        <div className="flex justify-center gap-4 mb-8">
                            {['summary', 'details', 'tracking'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2
                                        ${activeTab === tab 
                                            ? 'bg-pet-brown text-white shadow-lg scale-105' 
                                            : 'bg-pet-beige/20 text-pet-brown hover:bg-pet-beige/30'}`}
                                >
                                    {tab === 'summary' && '📦'}
                                    {tab === 'details' && '📝'}
                                    {tab === 'tracking' && '🚚'}
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {checkout && (
                            <div className="rounded-2xl border border-pet-brown/10 bg-white/80 p-6 shadow-lg animate-fade-in-up delay-100">
                                {/* Order Details Section with Enhanced Animations */}
                                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                                    <div className="text-lg md:text-xl font-semibold text-pet-brown bg-pet-beige/20 rounded-xl px-4 md:px-6 py-4 shadow-sm animate-fade-in-left hover:shadow-lg hover:bg-pet-beige/30 transition-all duration-300 w-full md:w-auto">
                                        <h2 className="mb-1 flex items-center gap-2 group flex-wrap">
                                            <span className="group-hover:rotate-12 transition-transform duration-300">📋</span>
                                            <span className="text-sm md:text-base">Order Id:</span>
                                            <span className="font-mono text-pet-brown bg-white/50 px-2 py-1 rounded text-xs md:text-sm break-all">
                                                {checkout._id}
                                            </span>
                                        </h2>
                                        <p className="text-pet-brown/60 text-xs md:text-sm flex items-center gap-2">
                                            <span className="animate-pulse">📅</span>
                                            Order date:{" "}
                                            {checkout.createdAt
                                                ? new Date(checkout.createdAt).toLocaleDateString()
                                                : ""}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-pet-brown/20 to-pet-beige rounded-xl px-6 py-4 shadow animate-fade-in-right hover:shadow-lg hover:scale-105 transition-all duration-300 w-full md:w-auto">
                                        <p className="text-pet-brown text-base font-bold flex items-center gap-2 group">
                                            <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">🚚</span>
                                            Estimated Delivery:{" "}
                                            <span className="ml-1 bg-white/50 px-2 py-1 rounded">
                                                {checkout.createdAt
                                                    ? calculateEstimateDelivery(checkout.createdAt)
                                                    : ""}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Enhanced Order Items Section */}
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6 text-pet-brown tracking-tight animate-fade-in-up delay-200 flex items-center gap-2 group">
                                        <span className="group-hover:rotate-12 transition-transform duration-300">🎁</span>
                                        Order Summary
                                        <span className="text-sm text-pet-brown/60 ml-2 animate-pulse">Woof!</span>
                                    </h3>
                                    <div className="divide-y divide-pet-brown/10 rounded-xl overflow-hidden bg-white/50">
                                        {checkout.checkoutItems &&
                                            checkout.checkoutItems.map((item, idx) => (
                                                <div
                                                    key={item.productId}
                                                    className="py-6 px-4 flex items-center gap-6 animate-fade-in-up hover:bg-pet-beige/5 transition-all duration-300 group"
                                                    style={{ animationDelay: `${100 + idx * 60}ms` }}
                                                >
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-pet-brown/5 rounded-2xl transform -rotate-6 transition-transform group-hover:rotate-6"></div>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded-2xl shadow-md border-2 border-pet-brown/10 bg-white relative z-10 transform transition-transform group-hover:scale-110 group-hover:rotate-3"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-semibold text-pet-brown mb-1 group-hover:text-pet-brown">
                                                            {item.name}
                                                            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">🐾</span>
                                                        </h4>
                                                        <p className="text-sm text-pet-brown/60 mb-1">
                                                            {item.color} | {item.size}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="inline-block bg-pet-beige/20 text-pet-brown rounded-full px-3 py-1 text-xs font-bold group-hover:bg-pet-brown group-hover:text-white transition-colors duration-300">
                                                                Qty: {item.quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right min-w-[80px]">
                                                        <p className="text-lg font-bold text-pet-brown group-hover:scale-110 transition-transform duration-300">
                                                            ${item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Enhanced Payment and Delivery Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 animate-fade-in-up delay-300">
                                    <div className="bg-pet-beige/10 rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                                        <h4 className="text-lg font-semibold mb-2 text-pet-brown flex items-center gap-2">
                                            <span className="group-hover:rotate-12 transition-transform duration-300">💳</span>
                                            Payment Details
                                        </h4>
                                        <p className="text-pet-brown/80 font-medium flex items-center gap-2">
                                            <span className="text-sm">💫</span>
                                            PayPal
                                        </p>
                                    </div>
                                    <div className="bg-pet-beige/10 rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                                        <h4 className="text-lg font-semibold mb-2 text-pet-brown flex items-center gap-2">
                                            <span className="group-hover:rotate-12 transition-transform duration-300">🏠</span>
                                            Delivery Address
                                        </h4>
                                        <p className="text-pet-brown/80 font-medium">
                                            {checkout.shippingAddress &&
                                                checkout.shippingAddress.address}
                                        </p>
                                        <p className="text-pet-brown/80 font-medium">
                                            {checkout.shippingAddress &&
                                                checkout.shippingAddress.city}
                                            ,{" "}
                                            {checkout.shippingAddress &&
                                                checkout.shippingAddress.country}
                                        </p>
                                    </div>
                                </div>

                                {/* Enhanced Thank You Message */}
                                <div className="text-center mt-12 pt-8 border-t border-pet-brown/10 relative">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-4">
                                        <span className="text-2xl animate-bounce">🎈</span>
                                    </div>
                                    <p className="text-pet-brown/70 text-lg flex items-center justify-center gap-2 group">
                                        <span className="group-hover:scale-110 transition-transform duration-300">Thank you for shopping with PetPal!</span>
                                        <span className="text-xl group-hover:rotate-12 transition-transform duration-300">🐾</span>
                                    </p>
                                    <p className="text-pet-brown/60 mt-2 animate-pulse">
                                        Your furry friend will be wagging with joy!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation;
