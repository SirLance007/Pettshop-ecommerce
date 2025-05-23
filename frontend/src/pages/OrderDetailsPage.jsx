import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'summary');

    const { orderDetails, loading, error } = useSelector((state) => state.order);
    const petEmojis = ['🐕', '🐈', '🐇', '🦜', '🐠', '🐹'];
    const [currentPetIndex, setCurrentPetIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPetIndex((prev) => (prev + 1) % petEmojis.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderDetails(id));
        }
    }, [dispatch, id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pet-beige via-white to-pet-beige/30">
            <div className="text-pet-brown text-xl animate-bounce">Loading... 🐾</div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pet-beige via-white to-pet-beige/30">
            <div className="text-red-500 text-xl">Error: {error} 😿</div>
        </div>
    );

    const handleRefresh = () => {
        dispatch(fetchOrderDetails(id));
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pet-beige via-white to-pet-beige/30">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="paw-print absolute top-20 left-10 opacity-10 animate-float">🐾</div>
                <div className="paw-print absolute top-40 right-20 opacity-10 animate-float-delayed">🐾</div>
                <div className="paw-print absolute bottom-20 left-1/4 opacity-10 animate-float">🐾</div>
                <div className="paw-print absolute top-1/3 right-1/4 opacity-10 animate-float-delayed">🐾</div>
                <div className="bone absolute top-1/4 left-1/3 opacity-10 animate-spin-slow">🦴</div>
                <div className="bone absolute bottom-1/4 right-1/3 opacity-10 animate-spin-slow-delayed">🦴</div>
                <div className="absolute top-1/2 left-10 opacity-20 animate-bounce-gentle text-4xl">🎾</div>
                <div className="absolute bottom-1/3 right-10 opacity-20 animate-spin-slow text-4xl">🪀</div>
                <div className="absolute top-20 right-1/4 opacity-20 animate-pulse text-4xl">🐟</div>
            </div>

            <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col items-center animate-fade-in">
                <div className="w-full bg-white/90 rounded-3xl shadow-2xl p-8 mt-10 animate-fade-in-up overflow-visible relative">
                    {/* Decorative Corner Elements */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform rotate-12 animate-spin-slow">
                        <span className="text-2xl">{petEmojis[currentPetIndex]}</span>
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform -rotate-12 animate-spin-slow">
                        <span className="text-2xl">🦴</span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <button
                            onClick={() => navigate("/my-orders")}
                            className="px-6 py-3 rounded-xl bg-pet-brown text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 group"
                        >
                            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                            Back to My Orders
                        </button>
                        <button
                            onClick={handleRefresh}
                            className="px-6 py-3 rounded-xl bg-pet-beige/20 text-pet-brown font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-pet-beige/30 flex items-center gap-2 group"
                        >
                            <span className="transform group-hover:rotate-180 transition-transform duration-500">🔄</span>
                            Refresh Status
                        </button>
                    </div>

                    {/* Header Section */}
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
                            Order Details
                            <span className="absolute -top-2 -right-2 text-sm animate-spin-slow">✨</span>
                        </h1>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                        {['summary', 'details', 'tracking'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm md:text-base
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

                    {orderDetails && (
                        <div className="rounded-2xl border border-pet-brown/10 bg-white/80 p-6 shadow-lg animate-fade-in-up delay-100">
                            {/* Order Info Cards */}
                            <div className="flex flex-col md:flex-row justify-between items-stretch mb-16 gap-6">
                                <div className="text-lg md:text-xl font-semibold text-pet-brown bg-gradient-to-br from-white via-pet-beige/10 to-pet-beige/20 rounded-2xl px-4 md:px-6 py-6 shadow-lg animate-fade-in-left hover:shadow-2xl transition-all duration-300 w-full md:w-auto relative overflow-hidden group">
                                    {/* Decorative Background Elements */}
                                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-pet-brown/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-pet-beige/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                                    
                                    <h2 className="mb-4 flex items-center gap-2 group relative">
                                        <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 bg-white/50 p-2 rounded-xl shadow-inner">📋</span>
                                        <div className="flex flex-col">
                                            <span className="text-sm md:text-base text-pet-brown/60">Order Id</span>
                                            <span className="font-mono text-pet-brown bg-white/80 px-3 py-1.5 rounded-lg text-xs md:text-sm break-all shadow-inner group-hover:shadow-lg transition-all duration-300">
                                                {orderDetails._id}
                                            </span>
                                        </div>
                                    </h2>
                                    <p className="text-pet-brown/60 text-xs md:text-sm flex items-center gap-2 mb-4 bg-white/50 p-2 rounded-lg">
                                        <span className="animate-pulse text-xl">📅</span>
                                        <span className="font-medium">
                                            {orderDetails.createdAt
                                                ? new Date(orderDetails.createdAt).toLocaleDateString()
                                                : ""}
                                        </span>
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        <span className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                                            orderDetails.isPaid
                                                ? "bg-gradient-to-r from-pet-brown/20 to-pet-beige text-pet-brown shadow-md hover:shadow-xl hover:-translate-y-1"
                                                : "bg-red-100 text-red-800 shadow hover:shadow-lg hover:bg-red-200"
                                            }`}
                                        >
                                            {orderDetails.isPaid ? "✅ Paid" : "❌ Not Paid"}
                                        </span>
                                        <span className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                                            orderDetails.status === "Delivered"
                                                ? "bg-gradient-to-r from-pet-brown/20 to-pet-beige text-pet-brown shadow-md hover:shadow-xl hover:-translate-y-1"
                                                : orderDetails.status === "Cancelled"
                                                ? "bg-red-100 text-red-800 shadow hover:shadow-lg hover:bg-red-200"
                                                : orderDetails.status === "Shipped"
                                                ? "bg-blue-100 text-blue-800 shadow hover:shadow-lg hover:bg-blue-200"
                                                : "bg-yellow-100 text-yellow-800 shadow hover:shadow-lg hover:bg-yellow-200"
                                            }`}
                                        >
                                            {orderDetails.status === "Delivered" && "🚚"}
                                            {orderDetails.status === "Cancelled" && "❌"}
                                            {orderDetails.status === "Shipped" && "📦"}
                                            {orderDetails.status === "Processing" && "⏳"}
                                            {orderDetails.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-pet-brown/10 via-pet-beige/10 to-white rounded-2xl px-6 py-6 shadow-lg animate-fade-in-right hover:shadow-2xl hover:scale-102 transition-all duration-300 w-full md:w-auto relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="text-pet-brown text-base font-bold flex items-center gap-3 group/item mb-4 bg-white/50 p-3 rounded-xl shadow-inner">
                                            <span className="text-2xl bg-gradient-to-br from-pet-brown/20 to-pet-beige p-2 rounded-lg shadow group-hover/item:rotate-12 transition-transform duration-300">🚚</span>
                                            <div>
                                                <span className="text-pet-brown/60 text-sm block">Delivery Method</span>
                                                <span className="text-pet-brown">DELIVERY</span>
                                            </div>
                                        </div>
                                        <div className="text-pet-brown text-base font-bold flex items-center gap-3 group/item bg-white/50 p-3 rounded-xl shadow-inner">
                                            <span className="text-2xl bg-gradient-to-br from-pet-brown/20 to-pet-beige p-2 rounded-lg shadow group-hover/item:rotate-12 transition-transform duration-300">💳</span>
                                            <div>
                                                <span className="text-pet-brown/60 text-sm block">Payment Method</span>
                                                <span className="text-pet-brown">{orderDetails.paymentMethod}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address Card */}
                            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
                                <div className="bg-gradient-to-br from-white via-pet-beige/5 to-pet-beige/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                                    <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-pet-brown/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-bold mb-4 text-pet-brown flex items-center gap-3">
                                            <span className="text-2xl bg-white/80 p-2 rounded-xl shadow group-hover:rotate-12 transition-transform duration-300">🏠</span>
                                            Shipping Address
                                        </h4>
                                        <div className="space-y-2 bg-white/50 p-4 rounded-xl shadow-inner">
                                            <p className="text-pet-brown/80 font-medium flex items-center gap-2">
                                                <span className="text-pet-brown/40">📍</span>
                                                {orderDetails.shippingAddress.address || "N/A"}
                                            </p>
                                            <p className="text-pet-brown/80 font-medium flex items-center gap-2">
                                                <span className="text-pet-brown/40">🌍</span>
                                                {orderDetails.shippingAddress.city},{" "}
                                                {orderDetails.shippingAddress.country ||
                                                    orderDetails.shippingAddress.coutry}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items Section */}
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold mb-6 text-pet-brown tracking-tight animate-fade-in-up delay-200 flex items-center gap-3">
                                    <span className="text-3xl bg-white/80 p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform duration-300">🎁</span>
                                    Order Items
                                    <span className="text-sm text-pet-brown/60 ml-2 animate-pulse">Woof!</span>
                                </h3>
                                <div className="space-y-4">
                                    {orderDetails.orderItems.map((item, idx) => (
                                        <div
                                            key={item.productId + idx}
                                            className="bg-gradient-to-br from-white via-pet-beige/5 to-pet-beige/20 rounded-2xl p-4 animate-fade-in-up transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-2xl"
                                            style={{ animationDelay: `${100 + idx * 60}ms` }}
                                        >
                                            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-pet-brown/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                            <div className="relative z-10 flex items-center gap-6 flex-col sm:flex-row">
                                                <div className="relative w-full sm:w-auto">
                                                    <div className="absolute inset-0 bg-pet-brown/5 rounded-2xl transform -rotate-6 transition-transform group-hover:rotate-6"></div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-2xl shadow-lg border-2 border-white bg-white relative z-10 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl"
                                                    />
                                                </div>
                                                <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                                                    <h4 className="text-lg font-bold text-pet-brown mb-2 group-hover:text-pet-brown flex items-center justify-center sm:justify-start">
                                                        {item.name}
                                                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">🐾</span>
                                                    </h4>
                                                    <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                                                        <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/50 text-pet-brown shadow-inner group-hover:bg-pet-brown group-hover:text-white transition-all duration-300 flex items-center gap-2">
                                                            <span className="text-base">📦</span>
                                                            Qty: {item.quantity}
                                                        </span>
                                                        <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/50 text-pet-brown shadow-inner group-hover:bg-pet-brown group-hover:text-white transition-all duration-300">
                                                            ${item.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shop Now Card */}
                            <div className="mt-12 mb-6">
                                <div className="bg-gradient-to-br from-pet-brown/10 via-pet-beige/10 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                                    {/* Decorative Background Elements */}
                                    <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-pet-brown/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="absolute -left-16 -top-16 w-32 h-32 bg-pet-beige/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                    
                                    {/* Floating Elements */}
                                    <div className="absolute top-4 right-8 text-4xl animate-bounce-gentle">🦴</div>
                                    <div className="absolute bottom-4 left-8 text-4xl animate-float">🐾</div>
                                    
                                    <div className="relative z-10 text-center">
                                        <h3 className="text-2xl md:text-3xl font-bold text-pet-brown mb-4 flex items-center justify-center gap-3">
                                            <span className="text-3xl animate-pulse">🎁</span>
                                            Continue Shopping
                                            <span className="text-3xl animate-pulse">🎁</span>
                                        </h3>
                                        <p className="text-pet-brown/70 mb-6 max-w-md mx-auto">
                                            Discover more pawsome products for your furry friends! 
                                            <span className="inline-block ml-2 animate-bounce">🐕</span>
                                        </p>
                                        <button
                                            onClick={() => navigate("/collections/all")}
                                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform group-hover:-translate-y-1 flex items-center gap-3 mx-auto"
                                        >
                                            <span className="text-xl group-hover:rotate-12 transition-transform duration-300">🛍️</span>
                                            Shop Now
                                            <span className="text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
