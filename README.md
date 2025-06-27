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
- **⚛️ React 18** - Modern Frontnend UI library with hooks
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


### Redux Toolkit Setup
- **🏪 Store Configuration** - Centralized state management
- **🔄 RTK Query** - Efficient data fetching and caching
- **📊 Slices** - Modular state management
- **🔧 DevTools Integration** - Enhanced development experience
