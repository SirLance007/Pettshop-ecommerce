# Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. **Clone the Repository**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install Dependencies**

Frontend:
```bash
cd frontend
npm install
```

Backend:
```bash
cd backend
npm install
```

3. **Environment Setup**

Create `.env` files in both frontend and backend directories.

Frontend (.env):
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. **Database Setup**

Start MongoDB service:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo service mongod start
```

Seed the database (optional):
```bash
cd backend
npm run seed
```

## Running the Application

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Building for Production

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Build Backend**
```bash
cd backend
npm run build
```

## Testing

Run frontend tests:
```bash
cd frontend
npm test
```

Run backend tests:
```bash
cd backend
npm test
```

## Deployment

1. **Backend Deployment (Example using Heroku)**
```bash
heroku create
git subtree push --prefix backend heroku main
```

2. **Frontend Deployment (Example using Vercel)**
```bash
cd frontend
vercel
```

## Additional Configuration

### SSL Setup
For production environments, configure SSL certificates:

1. Obtain SSL certificates (e.g., from Let's Encrypt)
2. Add certificates to your hosting environment
3. Update environment variables to use HTTPS

### Email Configuration
To enable email notifications:

1. Set up an email service (e.g., SendGrid, AWS SES)
2. Add email credentials to backend .env:
```
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_api_key
EMAIL_FROM=your@email.com
```

### Payment Gateway
The project uses Stripe for payments. To configure:

1. Create a Stripe account
2. Add Stripe keys to environment variables
3. Configure webhook endpoints in Stripe dashboard

## Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**
- Check if MongoDB is running
- Verify connection string in .env
- Ensure network connectivity

2. **NPM Install Fails**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again

3. **Build Errors**
- Check Node.js version compatibility
- Clear build cache
- Update dependencies

### Getting Help

- Check the [FAQ](./FAQ.md)
- Open an issue on GitHub
- Contact support team

## Security Considerations

1. **API Security**
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Use secure headers

2. **Authentication**
- Implement password policies
- Use secure session management
- Enable 2FA for admin accounts

3. **Data Protection**
- Regular database backups
- Encrypt sensitive data
- Implement access controls

## Performance Optimization

1. **Frontend**
- Enable code splitting
- Optimize images
- Implement caching
- Use CDN for static assets

2. **Backend**
- Implement database indexing
- Cache frequently accessed data
- Optimize API responses
- Use connection pooling

## Monitoring

1. **Application Monitoring**
- Set up error tracking (e.g., Sentry)
- Implement performance monitoring
- Configure logging

2. **Server Monitoring**
- Monitor server resources
- Set up alerts
- Track API usage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. 