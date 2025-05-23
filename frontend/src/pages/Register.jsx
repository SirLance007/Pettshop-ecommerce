import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { mergeCart } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, navigate, isCheckoutRedirect, dispatch, cart, guestId]);
  const handleSumbit = (action) => {
    action.preventDefault();
    // Frontend validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      toast.error("All fields are required.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    setError("");
    dispatch(registerUser({ email, password, name }))
      .unwrap()
      .then(() => {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error(err?.message || "Registration failed", {
          position: "top-right",
          autoClose: 2000,
        });
      });
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
      </div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl bg-white overflow-hidden relative">
          {/* Left: Form Section */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 relative z-10">
            <div className="max-w-md mx-auto">
              {/* Logo & Welcome */}
              <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center items-center mb-4">
                  <span className="text-5xl animate-bounce-gentle">🐾</span>
                  <h2 className="text-3xl font-extrabold text-pet-brown ml-3">PetPal</h2>
                </div>
                <h2 className="text-4xl font-bold text-pet-brown mb-2">Join Our Pack!</h2>
                <p className="text-pet-brown/60">Create an account to start shopping for your furry friends</p>
              </div>

              {/* Social Register Options */}
              <div className="flex gap-4 mb-8">
                <button className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300">
                  <span>G</span>
                  <span className="text-sm">Google</span>
                </button>
                <button className="flex-1 py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300">
                  <span>f</span>
                  <span className="text-sm">Facebook</span>
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-pet-brown/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-pet-brown/60">or register with email</span>
                </div>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSumbit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                <div className="group">
                  <label className="block text-pet-brown font-medium mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-4 bg-pet-beige/10 border border-pet-brown/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300 pl-12"
                      placeholder="Enter your full name"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl group-hover:rotate-12 transition-transform duration-300">
                      👤
                    </span>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-pet-brown font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 bg-pet-beige/10 border border-pet-brown/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300 pl-12"
                      placeholder="Enter your email"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl group-hover:rotate-12 transition-transform duration-300">
                      ✉️
                    </span>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-pet-brown font-medium mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-4 bg-pet-beige/10 border border-pet-brown/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pet-brown/30 transition-all duration-300 pl-12"
                      placeholder="Create a password (min. 6 characters)"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl group-hover:rotate-12 transition-transform duration-300">
                      🔒
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-pet-brown/20" />
                  <span className="text-sm text-pet-brown/60 group-hover:text-pet-brown transition-colors duration-300">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white p-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {loading ? (
                    <span className="relative">Loading...</span>
                  ) : (
                    <span className="relative flex items-center justify-center group-hover:scale-105 transform transition-transform duration-300">
                      <span className="mr-2 text-2xl group-hover:rotate-12 transition-transform duration-300">🐾</span>
                      Create Account
                      <span className="ml-2 text-2xl opacity-0 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-300">🦮</span>
                    </span>
                  )}
                </button>

                <p className="text-center mt-6">
                  <span className="text-pet-brown/60">Already have an account? </span>
                  <Link
                    to={`/login?redirect=${encodeURIComponent(redirect)}`}
                    className="inline-flex items-center font-semibold text-pet-brown hover:text-pet-brown/80 group"
                  >
                    <span className="relative">
                      Sign In
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pet-brown transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    <span className="ml-1 text-xl transform group-hover:scale-110 transition-transform duration-300">🐕</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right: Image Section */}
          <div className="hidden md:block w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pet-brown/20 to-pet-brown/40 mix-blend-multiply z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN1dGUlMjBhbmltYWx8ZW58MHx8MHx8fDA%3D"
              alt="Adorable dog looking at camera"
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-[3s]"
            />
            <div className="absolute inset-0 flex items-end p-12 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="text-white max-w-md">
                <h3 className="text-3xl font-bold mb-4">Join Our Pet Community</h3>
                <p className="text-lg text-white/90 mb-6">Get exclusive deals, pet care tips, and connect with other pet lovers in our growing community.</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎁</span>
                    <span className="text-sm font-medium">Member Discounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    <span className="text-sm font-medium">Mobile App Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
