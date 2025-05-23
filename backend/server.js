const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const orderAdminRoutes = require("./routes/adminOrderRoutes");

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
    'https://pawshop007.onrender.com',
    'https://pawshop007.vercel.app',
    'https://pawshop007-1-onrender-com.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    // Add your new frontend URLs here
    process.env.FRONTEND_URL, // Will be added from environment variable
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        
        // Check if the origin is allowed
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            // Handle wildcard subdomains
            if (allowedOrigin?.includes('*')) {
                const pattern = new RegExp('^' + allowedOrigin.replace('*', '.*'));
                return pattern.test(origin);
            }
            return allowedOrigin === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.error('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Connect to MongoDB 
connectDB();

// API Routes
app.get("/" , (req,res) => {
    res.send("WELCOME TO PAWSHOP API");
});
app.use("/api/users" , userRoutes);
app.use("/api/products" , productRoutes);
app.use("/api/cart" , cartRoutes);
app.use("/api/checkout" , checkoutRoutes);
app.use("/api/orders" , orderRoutes);
app.use("/api/upload" , uploadRoutes);
app.use("/api/subscribe" , subscribeRoutes);

// Admin Routes
app.use("/api/admin/users" , adminRoutes);
app.use("/api/admin/products" , productAdminRoutes);
app.use("/api/admin/orders" , orderAdminRoutes);

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})