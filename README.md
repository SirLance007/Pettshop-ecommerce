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

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- CORS

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Product Management**: 
  - Browse products by category
  - Filter and search functionality
  - Detailed product views
- **Shopping Cart**: 
  - Add/remove items
  - Update quantities
  - Calculate totals
- **Admin Dashboard**:
  - Product management
  - Order management
  - User management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**:
  - Pet-themed styling
  - Smooth animations
  - Intuitive navigation
- **Security**:
  - JWT authentication
  - Protected routes
  - Secure API endpoints

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