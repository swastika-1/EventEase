# EventEase – Event Booking & Management System

EventEase is a full-stack web application for discovering, creating, booking, and managing events. It supports three roles — **User, Organizer, and Admin** — with JWT authentication and role-based authorization.

## 🌐 Live Demo

**Frontend:** https://event-ease-jet.vercel.app/

**Backend API:** https://eventease-production-046d.up.railway.app/

## ✨ Features

### 👤 User
- Register and login
- Browse upcoming events
- View event details
- Book events
- Prevent duplicate bookings
- Cancel bookings
- View My Bookings

### 🎫 Organizer
- Organizer login
- Organizer dashboard
- Create events
- Edit events
- Delete events
- View attendees
- Track bookings and capacity

### 🛡️ Admin
- Admin login
- Role-based admin access
- View registered users and roles
- View all events
- View bookings
- Monitor event capacity and booking counts

## 🔐 Authentication & Authorization

EventEase uses **JSON Web Tokens (JWT)** for authentication.

Protected API requests use:

```text
Authorization: Bearer <token>
```

The application supports these roles:

- `USER`
- `ORGANIZER`
- `ADMIN`

Passwords are securely hashed using **bcrypt**.

## 🛠️ Technology Stack

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- JWT
- bcryptjs

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel — Frontend
- Railway — Backend
- MongoDB Atlas — Database

### Tools
- Visual Studio Code
- Git
- GitHub
- Browser Developer Tools

## 📂 Project Structure

```text
EventEase/
│
├── client/
│   └── src/
│       └── app/
│           ├── components/
│           ├── guards/
│           ├── services/
│           ├── app.routes.ts
│           └── ...
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The `.env` file is excluded from GitHub and must never be committed because it contains private credentials.

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/swastika-1/EventEase.git
cd EventEase
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Create the backend `.env`

Inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Do not upload this file to GitHub.

### 4. Start the backend

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

### 6. Start Angular

```bash
ng serve
```

Frontend:

```text
http://localhost:4200
```

## 🔌 Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Events

```text
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Bookings

```text
POST   /api/bookings
GET    /api/bookings/my
DELETE /api/bookings/:id
```

### Admin

```text
GET /api/admin/users
GET /api/admin/events
GET /api/admin/bookings
```

## 🧪 Tested Roles

| Role | Tested Functionality |
|------|----------------------|
| USER | Login, browse events, book events, view bookings |
| ORGANIZER | Login, create events, manage events, view attendees |
| ADMIN | Login, dashboard, users, events, bookings |

## 📸 Application Modules

- Home Page
- Registration
- Login
- Events
- Event Details
- My Bookings
- Organizer Dashboard
- Create Event
- Edit Event
- Attendees
- Admin Dashboard

## 🔒 Security

- JWT authentication for protected API requests
- bcrypt password hashing
- Role-based route protection
- Environment variables for sensitive configuration
- Database credentials and JWT secrets excluded from GitHub

## 👩‍💻 Developer

**Swastika Gupta**

B.Tech Computer Science Engineering  
KIIT University

## 📄 License

This project was developed as an academic/full-stack development project.
