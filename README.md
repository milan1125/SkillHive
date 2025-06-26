# 🎓 SkillHive - Modern Learning Management System

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
</div>

<br>

<div align="center">
  <h3>🚀 A comprehensive e-learning platform built with modern web technologies</h3>
  <p>Create, sell, and learn with our feature-rich learning management system</p>
</div>

---

## ✨ Features

### 🎯 For Students
- **🔍 Course Discovery**: Browse thousands of courses with advanced search and filtering
- **📚 Learning Progress**: Track your progress through courses and lectures
- **🎥 Video Learning**: High-quality video streaming with progress tracking
- **📱 Responsive Design**: Learn on any device - desktop, tablet, or mobile
- **🌙 Dark Mode**: Eye-friendly learning experience with dark/light theme toggle
- **📈 Dashboard**: Personalized learning dashboard with statistics
- **🏆 Course Completion**: Mark courses as complete and track achievements

### 👨‍🏫 For Instructors
- **📖 Course Creation**: Intuitive course builder with rich text editor
- **🎬 Video Management**: Upload and manage video lectures with Cloudinary
- **💰 Monetization**: Set course prices and earn from your content
- **📊 Analytics**: Track course performance and student engagement
- **✏️ Content Management**: Edit courses, lectures, and descriptions easily
- **🔄 Publishing Control**: Publish/unpublish courses with validation

### 💳 E-commerce Features
- **🛒 Secure Payments**: Integrated Stripe payment processing
- **💰 Multiple Pricing**: Support for free and paid courses
- **📄 Purchase History**: Complete transaction tracking
- **🔐 Access Control**: Automatic course access after purchase
- **🎫 Enrollment Management**: Automatic enrollment and access control

## 🏗️ Tech Stack

### Frontend
- **⚛️ React 18** - Modern UI library with hooks
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🧩 Shadcn/ui** - Beautiful, accessible component library
- **🔄 Redux Toolkit** - State management with RTK Query
- **🛣️ React Router** - Client-side routing
- **📝 React Quill** - Rich text editor for course content
- **🎥 React Player** - Video player component
- **⚡ Vite** - Fast build tool and dev server
- **🎯 Lucide React** - Beautiful icons

### Backend
- **🟢 Node.js** - JavaScript runtime
- **🚀 Express.js** - Web application framework
- **🍃 MongoDB** - NoSQL database with Mongoose ODM
- **🔐 JWT** - JSON Web Token authentication
- **🛡️ bcryptjs** - Password hashing
- **☁️ Cloudinary** - Media storage and delivery
- **💳 Stripe** - Payment processing
- **📁 Multer** - File upload handling
- **🍃 CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
SkillHive/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Shadcn/ui components
│   │   │   └── ...        # Custom components
│   │   ├── features/      # Redux slices and API
│   │   │   └── api/       # RTK Query API definitions
│   │   ├── pages/         # Route components
│   │   │   ├── admin/     # Instructor/admin pages
│   │   │   └── student/   # Student pages
│   │   ├── layout/        # Layout components
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
├── server/                # Node.js backend application
│   ├── controllers/       # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── middlewares/      # Custom middleware
│   ├── utils/            # Helper functions
│   ├── uploads/          # File upload directory
│   └── package.json      # Backend dependencies
│
└── README.md             # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **Stripe Account** (for payments)
- **Cloudinary Account** (for media storage)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/skillhive.git
cd skillhive
```

### 2️⃣ Backend Setup
```bash
cd server
npm install

# Create .env file with your configurations
cp .env.example .env
```

**Environment Variables** (server/.env):
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/skillhive
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
WEBHOOK_ENDPOINT_SECRET=your_stripe_webhook_secret
```

```bash
# Start the backend server
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install

# Start the frontend development server
npm run dev
```

### 4️⃣ Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080

## 🔧 API Endpoints

### Authentication
```
POST /api/v1/user/register    # User registration
POST /api/v1/user/login       # User login
POST /api/v1/user/logout      # User logout
GET  /api/v1/user/profile     # Get user profile
PUT  /api/v1/user/profile     # Update user profile
```

### Courses
```
GET    /api/v1/course/published-courses     # Get all published courses
GET    /api/v1/course/search               # Search courses
POST   /api/v1/course                      # Create new course
PUT    /api/v1/course/:id                  # Update course
GET    /api/v1/course/:id                  # Get course by ID
PATCH  /api/v1/course/:id?publish=true     # Publish/unpublish course
```

### Lectures
```
POST   /api/v1/course/:courseId/lecture           # Create lecture
GET    /api/v1/course/:courseId/lecture           # Get course lectures
POST   /api/v1/course/:courseId/lecture/:id       # Update lecture
DELETE /api/v1/course/lecture/:id                 # Delete lecture
```

### Payments
```
POST /api/v1/purchase/checkout/create-checkout-session  # Create Stripe session
POST /api/v1/purchase/webhook                           # Stripe webhook
GET  /api/v1/purchase/course/:id/detail-with-status     # Get course with purchase status
GET  /api/v1/purchase                                   # Get purchased courses
```

### Progress Tracking
```
GET  /api/v1/progress/:courseId                        # Get course progress
POST /api/v1/progress/:courseId/lecture/:id/view       # Mark lecture as viewed
POST /api/v1/progress/:courseId/complete               # Mark course as complete
POST /api/v1/progress/:courseId/incomplete             # Mark course as incomplete
```

## 🎨 UI/UX Features

### Design System
- **🎨 Modern Glass-morphism** - Beautiful frosted glass effects
- **🌈 Gradient Backgrounds** - Eye-catching color gradients
- **✨ Smooth Animations** - Micro-interactions and transitions
- **📱 Responsive Design** - Mobile-first approach
- **🌙 Dark Mode Support** - Complete theme switching
- **♿ Accessibility** - WCAG compliant components

### Components
- **🔘 Interactive Buttons** - Hover effects and loading states
- **📋 Data Tables** - Sortable and filterable tables
- **🎭 Modals & Dialogs** - Accessible modal components
- **📊 Progress Bars** - Visual progress indicators
- **🏷️ Badges & Tags** - Status and category indicators
- **🔍 Search Interface** - Advanced search with filters

## 🛡️ Security Features

- **🔐 JWT Authentication** - Secure token-based authentication
- **🛡️ Password Hashing** - bcryptjs for secure password storage
- **🚧 Route Protection** - Protected routes for authenticated users
- **👑 Role-based Access** - Separate admin and student interfaces
- **🔒 CORS Configuration** - Secure cross-origin requests
- **💳 Secure Payments** - PCI-compliant Stripe integration

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **🖥️ Desktop** (1200px+)
- **💻 Laptop** (768px - 1199px)
- **📱 Tablet** (640px - 767px)
- **📞 Mobile** (320px - 639px)

## 🔄 State Management

### Redux Toolkit Setup
- **🏪 Store Configuration** - Centralized state management
- **🔄 RTK Query** - Efficient data fetching and caching
- **📊 Slices** - Modular state management
- **🔧 DevTools Integration** - Enhanced development experience

### API Slices
- **authApi** - Authentication endpoints
- **courseApi** - Course management
- **purchaseApi** - Payment processing
- **courseProgressApi** - Learning progress

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku)
```bash
cd server
# Set environment variables in your hosting platform
# Deploy the server directory
```

### Database (MongoDB Atlas)
- Create a MongoDB Atlas cluster
- Update the MONGO_URI in your environment variables
- Ensure network access is configured properly

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **💻 Make your changes**
4. **✅ Test your changes**
5. **📝 Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **📤 Push to the branch** (`git push origin feature/amazing-feature`)
7. **🔄 Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📸 Screenshots

### Landing Page
Beautiful hero section with course search and featured categories.

### Course Catalog
Advanced filtering and search functionality with responsive grid layout.

### Course Detail Page
Comprehensive course information with video preview and purchase options.

### Learning Interface
Immersive video learning experience with progress tracking.

### Admin Dashboard
Instructor dashboard for managing courses, lectures, and analytics.

## 🎯 Future Enhancements

- **📊 Advanced Analytics** - Detailed course and student analytics
- **💬 Discussion Forums** - Course-specific discussion boards
- **📝 Assignments & Quizzes** - Interactive learning assessments
- **🎖️ Certificates** - Automated certificate generation
- **📱 Mobile App** - React Native mobile application
- **🤖 AI Recommendations** - Personalized course recommendations
- **🌐 Multi-language Support** - Internationalization
- **📧 Email Notifications** - Course updates and reminders

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development** - React, Tailwind CSS, Redux Toolkit
- **Backend Development** - Node.js, Express, MongoDB
- **UI/UX Design** - Modern, responsive design system
- **Payment Integration** - Stripe payment processing
- **Media Management** - Cloudinary integration

## 📞 Support

If you have any questions or need help with the project:

- **📧 Email**: support@skillhive.com
- **💬 Discord**: Join our community server
- **📖 Documentation**: Check out our detailed docs
- **🐛 Issues**: Report bugs on GitHub

---

<div align="center">
  <p>Made with ❤️ by the SkillHive Team</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
