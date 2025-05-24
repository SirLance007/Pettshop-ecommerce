# API Documentation

## Authentication

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

### POST /api/auth/login
Authenticate a user and get a token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

## Products

### GET /api/products
Get a list of products with optional filtering.

**Query Parameters:**
- `category` (string, optional): Filter by category
- `search` (string, optional): Search term
- `page` (number, optional): Page number for pagination
- `limit` (number, optional): Items per page
- `sort` (string, optional): Sort field (price, name, createdAt)
- `order` (string, optional): Sort order (asc, desc)

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "images": ["string"],
      "stock": "number"
    }
  ],
  "total": "number",
  "page": "number",
  "pages": "number"
}
```

### POST /api/products
Create a new product (Admin only).

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "images": ["string"],
  "stock": "number"
}
```

### GET /api/products/:id
Get detailed information about a specific product.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "images": ["string"],
  "stock": "number",
  "reviews": [
    {
      "id": "string",
      "user": {
        "id": "string",
        "name": "string"
      },
      "rating": "number",
      "comment": "string",
      "createdAt": "string"
    }
  ]
}
```

## Orders

### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "string",
      "quantity": "number"
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "paymentMethod": "string"
}
```

### GET /api/orders
Get user's order history.

**Query Parameters:**
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

**Response:**
```json
{
  "orders": [
    {
      "id": "string",
      "items": [
        {
          "product": {
            "id": "string",
            "name": "string",
            "price": "number"
          },
          "quantity": "number"
        }
      ],
      "total": "number",
      "status": "string",
      "createdAt": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "pages": "number"
}
```

## AI Recommendations

### POST /api/recommendations
Get AI-powered product recommendations.

**Request Body:**
```json
{
  "currentProductId": "string",
  "userHistory": ["string"],
  "userPreferences": {
    "categories": ["string"],
    "priceRange": {
      "min": "number",
      "max": "number"
    }
  },
  "limit": "number"
}
```

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "price": "number",
    "image": "string",
    "matchScore": "number"
  }
]
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "string",
  "message": "string"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
``` 