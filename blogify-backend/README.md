# 🔐 User Credential System | Blogify

A secure, token-based user authentication system built for **Blogify**, a blogging platform where users can register, login, and manage posts securely with a protected dashboard.

---

## 🚀 Features

* ✅ **User Registration** with username, email, and password
* ✅ **Secure Login** with JWT-based token authentication
* ✅ **Protected Dashboard** accessible only to logged-in users
* ✅ **Logout Support** (token removal on client side)
* ✅ Error handling and input validation
* ✅ Built with **MongoDB, Express, Node.js**, and **Vanilla JS (Frontend)**

---

## 💠 Tech Stack

| Category    | Tools Used                        |
| ----------- | --------------------------------- |
| Backend     | Node.js, Express.js               |
| Database    | MongoDB (with Mongoose)           |
| Frontend    | HTML, CSS, JavaScript             |
| Auth System | JWT (JSON Web Token)              |
| Tools       | Git, GitHub, REST APIs, Fetch API |

---

## 📁 Project Structure

```
blogify/
├── blogify-backend/        # Backend server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.js
│
├── frontend-blogify/       # Frontend files
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── script.js
│   └── styles.css
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🔐 API Endpoints

### 👉 `POST /api/v1/users/register`

Registers a new user
**Body:**

```json
{
  "username": "meena",
  "email": "meena@example.com",
  "password": "securepassword"
}
```

### 👉 `POST /api/v1/users/login`

Logs in an existing user
**Body:**

```json
{
  "email": "meena@example.com",
  "password": "securepassword"
}
```

### 👉 `POST /api/v1/users/logout`

Logs the user out (client should remove token from storage)

---

## 🔒 Token-Based Authentication Flow

1. On login, a **JWT token** is generated and returned to the client
2. Token is stored in **localStorage**
3. Every protected request includes `Authorization: Bearer <token>`
4. Backend validates token for access to secured routes like dashboard

---

## 📦 How to Run Locally

### 🔧 Backend Setup

```bash
cd blogify-backend
npm install
npm start
```

Make sure you have `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 🌐 Frontend Setup

Just open `frontend-blogify/index.html` in your browser or use **Live Server** extension in VS Code.

---

## ✨ Future Enhancements

* [ ] Password reset with email OTP
* [ ] Add user profile editing and profile pictures
* [ ] Email verification on registration
* [ ] Refresh tokens for longer sessions
* [ ] Role-based authentication (admin, writer, reader)

---

## 👥 Author

Made with ❤️ by [Meena Roshini](https://github.com/M-130904)

---

## 📜 License

This project is licensed under the **MIT License** © 2025 Meena Roshini.

---

> 💡 Tip: If you find this helpful, consider giving a star to the [GitHub Repo](https://github.com/M-130904/blogify-backend)!
