Full System Documentation
# 💖 Loveline Market


## 🚀 Overview

Loveline Market is a **full-stack web application** that allows users to earn rewards through:

* 📱 Referrals (inviting others)
* 👁️ Viewing content (submitting proof of engagement)
* 💰 Earnings based on approved activity

The platform includes a **secure Admin Panel** where administrators:

* Approve or reject user activities
* Manage uploaded posters (content users interact with)
* Monitor system performance and earnings

---

## 🧱 Tech Stack

### Frontend

* React (TypeScript)
* Axios (API communication)
* React Router (navigation)

### Backend

* Node.js + Express
* Prisma ORM
* PostgreSQL (Neon DB)
* JWT Authentication
* Multer (file uploads)

---

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── index.js
│
├── prisma/
│   └── schema.prisma
│
├── uploads/
└── createAdmin.js


frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── App.tsx
```

---

## 🔐 Authentication System

### 👤 User Authentication

* Uses JWT stored in:

  ```
  localStorage → "token"
  ```

### 👑 Admin Authentication (2-Step)

1. Email + Password login
2. OTP verification via email

Token stored as:

```
localStorage → "adminToken"
```

---

## 🔁 Application Flow

### 👤 USER FLOW

1. Register account
2. Login
3. Access dashboard
4. Submit:

   * Referral (phone number)
   * View proof (screenshot + views)
5. Wait for admin approval
6. Earn points / money

---

### 👑 ADMIN FLOW

1. Login → OTP verification
2. Access protected dashboard
3. Manage:

   * Referrals
   * View submissions
   * Posters

---

## 📊 Core Features

---

### 📱 Referrals

* Users submit phone numbers
* System checks:

  * Not already a buyer
  * Not duplicated
* Stored as:

  ```
  status: PENDING | APPROVED | REJECTED
  ```

---

### 👁️ View Submissions

* User uploads:

  * Screenshot
  * Number of views
* Admin verifies
* Earnings calculated per submission

---

### 🖼️ Poster System

Admins can:

* Upload posters
* Add captions
* Activate one poster at a time
* Delete posters

Users:

* Only see active poster

---

### 📊 Dashboard Summary (User)

Displays:

* Total Points (approved referrals)
* Pending referrals
* Approved referrals
* Total earnings
* Pending views

---

### 📊 Admin Dashboard

Includes:

* System stats
* Search functionality
* Approval system
* Poster management

---

## 🔌 API Endpoints

---

### 👤 USER

#### Auth

```
POST /api/user/register
POST /api/user/login
```

#### Referrals

```
POST /api/referral/submit
GET  /api/referral/my
```

#### Views

```
POST /api/view/submit
GET  /api/view/my
```

#### Dashboard

```
GET /api/dashboard/summary
```

---

### 👑 ADMIN

#### Auth

```
POST /api/admin/login
POST /api/admin/verify-otp
```

#### Referrals

```
GET  /api/admin/referral/pending
POST /api/admin/referral/approve/:id
POST /api/admin/referral/reject/:id
```

#### Views

```
GET  /api/admin/views
POST /api/admin/views/approve/:id
POST /api/admin/views/reject/:id
```

#### Posters

```
POST   /api/poster        (upload)
GET    /api/poster/all
DELETE /api/poster/:id
PUT    /api/poster/caption/:id
POST   /api/poster/activate/:id
GET    /api/poster/active
```

---

## 🔐 Middleware

### verifyUser

* Protects user routes
* Validates JWT token

### verifyAdmin

* Protects admin routes
* Ensures adminToken is valid

---

## ⚙️ Environment Variables

Create `.env` inside backend:

```
DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 📧 Email Setup (OTP)

Use Gmail App Password:

Steps:

1. Enable 2FA
2. Generate App Password
3. Add to `.env`

---

## 🗄️ Database (Prisma)

Run:

```
npx prisma generate
npx prisma migrate dev
```

---

## 👑 Create Admin

Run:

```
node createAdmin.js
```

⚠️ If email exists → change email or delete existing record

---

## 🧪 Running the App

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm start
```

---

## 🌐 Routes (Frontend)

```
/                 → Home
/profile/login    → User login
/profile/register → Register
/dashboard        → User dashboard

/admin-login      → Admin login
/admin-verify     → OTP page
/admin-secure-92xk → Admin dashboard (protected)
```

---

## 🔐 Protected Routes

### AdminProtectedRoute

* Blocks access without adminToken

### UserProtectedRoute (optional)

* Blocks access without user token

---

## 🧠 Key Logic Decisions

* Admin approval controls earnings (prevents fraud)
* OTP adds extra security
* Poster system drives engagement
* Separation of user/admin tokens avoids conflicts

---

## ⚠️ Common Issues & Fixes

### ❌ Cannot read findMany

→ Prisma model name mismatch

### ❌ Login fails

→ Admin not created OR wrong password

### ❌ OTP not sending

→ Email credentials missing

### ❌ Unauthorized

→ Token not attached properly

---

## 🚀 Deployment (Next Step)

You can deploy using:

* Backend → Render / Railway / VPS
* Frontend → Vercel / Netlify/purchased hosting which do supports html
* Database → Neon or MySql

---

## 📌 Future Improvements

* 💳 Withdraw system (M-Pesa)
* 📊 Analytics dashboard
* 🔔 Notifications
* 📱 Mobile app (React Native)
* 🧾 Payment history

---

## 🧑‍💻 Author

Built with passion by:
**Legend**

Frontend designed by the best designer
they may not include name because they might not read this😂😂

---

## ❤️ Final Note

This is not just a project, it's a **scalable earning platform**.

With proper deployment, marketing, and payment integration,
this can become a **real business system**.

---

🔥 Keep building. Keep shipping.
