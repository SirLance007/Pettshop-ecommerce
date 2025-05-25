# PawShop - Pet E-commerce Platform

A modern, full-stack e-commerce platform specialized for pet products. PawShop offers a wide range of products for various pets including dogs, cats, birds, and small animals.

## 🌟 Live Demo

- Frontend: [https://pettshop-prankur-frontend.onrender.com](https://pettshop-prankur-frontend.onrender.com)
- Backend: [https://pettshop-ecommerce.onrender.com](https://pettshop-ecommerce.onrender.com)

## 🚀 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion (for animations)
- React Icons
- Redux Toolkit (for state management)
- Axios (for API requests)
- Sonner (for toast notifications)
- Web Speech API (for voice assistant)
- React Speech Recognition (for voice commands)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- CORS

## ✨ Features

- **Voice Assistant**: 
  - Voice-controlled navigation
  - Product search by voice
  - Hands-free shopping experience
  - Voice commands for cart management
  - Accessibility support
  - Natural language processing
- **User Authentication**: 
  - Secure login and registration system
  - Guest user functionality
  - Persistent sessions
- **Product Management**: 
  - Browse products by category
  - Advanced filter and search functionality
  - Detailed product views with multiple images
  - Size and color selection
  - Similar products recommendations
- **Shopping Cart**: 
  - Add/remove items
  - Update quantities
  - Size and color variants
  - Real-time price calculations
  - Guest cart functionality
- **Wishlist**:
  - Add/remove products
  - Persistent wishlist storage
  - Quick add to cart from wishlist
- **Product Details**:
  - Image gallery with thumbnails
  - Dynamic size and color selection
  - Quantity adjustment
  - Sale price display
  - Product features and benefits
  - Free shipping indicators
- **User Experience**:
  - Toast notifications for actions
  - Animated UI elements
  - Loading states with animations
  - Responsive image galleries
  - Intuitive size/color selectors
- **Admin Dashboard**:
  - Product management
  - Order management
  - User management
  - Sales analytics
- **Responsive Design**: 
  - Works seamlessly on desktop and mobile devices
  - Optimized image loading
  - Touch-friendly interfaces
- **Modern UI/UX**:
  - Pet-themed styling
  - Smooth animations and transitions
  - Intuitive navigation
  - Interactive product cards
- **Security**:
  - JWT authentication
  - Protected routes
  - Secure API endpoints
  - Guest user data protection

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Frontend Setup
1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-repo-name]/frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the frontend directory
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server
```bash
npm start
```

### Backend Setup
1. Navigate to the backend directory
```bash
cd ../backend
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the backend directory
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the server
```bash
npm start
```

## 📱 Environment Variables

### Frontend
- `REACT_APP_API_URL`: Backend API URL

### Backend
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `NODE_ENV`: Environment (development/production)

## 🎨 Color Scheme

The project uses a pet-themed color palette:
- Primary: Pet Brown (#8B4513)
- Secondary: Pet Beige
- Accent colors for different sections

## 📄 API Documentation

The backend provides RESTful APIs for:
- User authentication
- Product management
- Cart operations
- Order processing
- Admin functionalities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Prankur Sharma**
- Role: Web Developer
- Project: PawShop E-commerce Platform

## 🙏 Acknowledgments

- Pet-themed icons and images from various sources
- React Icons library
- Tailwind CSS community
- Framer Motion for animations 
