# Adventour 🏔️

A full-stack web application for booking adventure tours with secure payment processing, user authentication, and interactive maps.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://naturetours-zckq.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.18-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://www.mongodb.com/)

**[View Live Demo →](https://naturetours-zckq.onrender.com/)**

---

## 📖 About

Adventour is a full-stack tour booking platform built with Node.js and Express. Users can browse adventure tours, make secure payments via Stripe, and manage their bookings. The application demonstrates RESTful API design, secure authentication, and integration with third-party services.

This project was built as a comprehensive learning exercise to understand backend development, focusing on practical implementation of industry-standard patterns and best practices.

---

## ✨ Features

### User Features
- **Browse Tours** - Explore available adventure tours with detailed information
- **User Authentication** - Secure signup/login with JWT tokens
- **Book Tours** - Secure payment processing via Stripe Checkout
- **User Dashboard** - View and manage bookings
- **Reviews & Ratings** - Leave reviews for completed tours
- **Profile Management** - Update account details and upload profile photos
- **Password Management** - Reset forgotten passwords via email

### Technical Features
- **RESTful API** with filtering, sorting, and pagination
- **JWT Authentication** with HTTP-only cookies
- **Role-Based Access Control** (User, Guide, Lead Guide, Admin)
- **Stripe Webhook Integration** for payment confirmation
- **MongoDB Geospatial Queries** for location-based search
- **Email Notifications** for welcome messages and password resets
- **Image Upload & Processing** with automatic resizing
- **Server-Side Rendering** with Pug templates
- **Security Middleware** including rate limiting and data sanitization

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Frontend
- **Pug** - Templating engine
- **JavaScript (ES6+)** - Client-side functionality
- **Parcel** - Module bundler
- **Leaflet.js** - Interactive maps
- **Axios** - HTTP requests

### Third-Party Services
- **Stripe** - Payment processing
- **Sendinblue** - Email delivery (production)
- **Mailtrap** - Email testing (development)
- **MongoDB Atlas** - Database hosting
- **Render** - Application deployment

### Key Packages
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** & **sharp** - File uploads and image processing
- **nodemailer** - Email handling
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **express-mongo-sanitize** - NoSQL injection prevention
- **xss-clean** - XSS attack prevention

---

## 📐 Architecture

### MVC Pattern
```
├── models/          # Data models (Tour, User, Review, Booking)
├── views/           # Pug templates
├── controllers/     # Business logic
├── routes/          # API routes
├── utils/           # Helper functions (error handling, email, etc.)
└── public/          # Static assets (CSS, JS, images)
```

### API Structure
```
/api/v1
  ├── /tours        # Tour CRUD operations
  ├── /users        # User management & authentication
  ├── /reviews      # Tour reviews
  └── /bookings     # Tour bookings & Stripe integration
```

---

## 🔐 Security Features

- **Authentication**: JWT tokens stored in HTTP-only cookies
- **Password Security**: Bcrypt hashing with salt rounds
- **Rate Limiting**: 100 requests per hour per IP
- **Security Headers**: Helmet.js for HTTP security headers
- **Data Sanitization**: Protection against NoSQL injection and XSS
- **CORS**: Configured cross-origin resource sharing
- **Parameter Pollution**: HPP middleware protection

---

## 🗺️ Key API Features

### Advanced Querying
```bash
# Filtering
GET /api/v1/tours?difficulty=easy&price[lt]=1000

# Sorting
GET /api/v1/tours?sort=-ratingsAverage,price

# Field Selection
GET /api/v1/tours?fields=name,duration,price

# Pagination
GET /api/v1/tours?page=2&limit=10
```

### Geospatial Queries
```bash
# Find tours within radius
GET /api/v1/tours/tours-within/200/center/34.111745,-118.113491/unit/mi

# Calculate distances
GET /api/v1/tours/distances/34.111745,-118.113491/unit/mi
```

### Aggregation
- Tour statistics grouped by difficulty
- Monthly tour planning
- Top-rated tours

---

## 💳 Payment Flow

1. User selects a tour and clicks "Book Tour"
2. Backend creates Stripe Checkout session
3. User redirected to Stripe for payment
4. Upon successful payment, Stripe sends webhook
5. Backend verifies webhook signature
6. Booking created in database
7. Confirmation email sent to user

---

## 📧 Email System

**Development**: Emails captured in Mailtrap for testing  
**Production**: Sent via Sendinblue SMTP

Implemented emails:
- Password reset with secure token


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nikhil-pandey-digital/Adventour.git
cd Adventour
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `config.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/adventour
DATABASE_PASSWORD=your_password

# JWT
JWT_SECRET=your-jwt-secret-min-32-characters
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email (Development)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
EMAIL_FROM=admin@adventour.io

# Email (Production)
SENDINBLUE_USERNAME=your_sendinblue_username
SENDINBLUE_PASSWORD=your_sendinblue_password

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

4. **Build frontend assets**
```bash
npm run build:js
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📝 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run build:js   # Build frontend JavaScript bundle
npm run watch:js   # Watch and rebuild on changes
```

---

## 🌐 Deployment

The application is deployed on [Render](https://render.com) with:
- Automatic deployments from GitHub
- Environment variables configured in dashboard
- MongoDB Atlas for database hosting
- Stripe webhooks for production payments

**Live URL**: [https://naturetours-zckq.onrender.com](https://naturetours-zckq.onrender.com)

### Testing the Application

**Test Credentials:**
- Create a new account or use demo features

**Stripe Test Card:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="https://i.ibb.co/njFW5Qh/screely-1677924845579.png" alt="Homepage" width="400"/><br/><b>Homepage - Tour Listings</b></td>
    <td><img src="https://i.ibb.co/dBmFxDT/screely-1677925195556.png" alt="Login" width="400"/><br/><b>User Login</b></td>
  </tr>
  <tr>
    <td><img src="https://i.ibb.co/N6g9zS3/screely-1677925947288.png" alt="Tour Details" width="400"/><br/><b>Tour Details</b></td>
    <td><img src="https://i.ibb.co/kKSkrL4/screely-1677925542185.png" alt="Reviews" width="400"/><br/><b>User Reviews</b></td>
  </tr>
  <tr>
    <td><img src="https://i.ibb.co/HpKYqvk/screely-1677926181141.png" alt="Payment" width="400"/><br/><b>Stripe Checkout</b></td>
    <td><img src="https://i.ibb.co/3NfTPfR/screely-1677926433166.png" alt="Bookings" width="400"/><br/><b>My Bookings</b></td>
  </tr>
</table>

**Interactive Map Feature:**

<img src="https://res.cloudinary.com/ddkq38nrs/image/upload/v1767626479/Screenshot_2026-01-05_204040_b53drc.png" alt="Maps" width="600"/>

---

## 🎓 Learning Outcomes

This project demonstrates understanding of:

- **Backend Development**: RESTful API design, MVC architecture
- **Database Design**: Schema modeling, relationships, indexing
- **Authentication & Authorization**: JWT implementation, role-based access
- **Security**: Industry-standard security practices
- **Third-Party Integration**: Stripe payments, email services, maps
- **Error Handling**: Centralized error handling, async error management
- **File Handling**: Image upload, processing, and optimization
- **Deployment**: Production environment setup and management

---

## 🔮 Future Enhancements

Potential improvements for learning and portfolio development:
- Advanced booking features (date selection, group bookings)
- Admin dashboard for tour management
- Enhanced review system with photo uploads
- Booking confirmation emails
- Real-time availability updates
- Mobile responsiveness improvements
- API documentation with Swagger
- Unit and integration testing

---

## 🤝 Contributing

This is a learning project, but feedback and suggestions are welcome! Feel free to:
- Open an issue for bugs or suggestions
- Fork the repository for your own learning
- Reach out with questions or improvements

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Nikhil Pandey**

- GitHub: [@nikhil-pandey-digital](https://github.com/nikhil-pandey-digital)
- Email: thenikhilpandey11@gmail.com
- LinkedIn: [Connect with me](https://www.linkedin.com/in/nikhil-pandey-digital/)

---

## 🙏 Acknowledgments

- Built as part of a comprehensive Node.js learning course
- Stripe for payment processing infrastructure
- MongoDB Atlas for database hosting
- Render for deployment platform
- OpenStreetMap & Leaflet.js for mapping

---

<div align="center">

**Built with Node.js, Express, and MongoDB**

⭐ Star this repo if you find it helpful!

[View Live Demo](https://naturetours-zckq.onrender.com/) • [Report Bug](https://github.com/nikhil-pandey-digital/Adventour/issues)

</div>
