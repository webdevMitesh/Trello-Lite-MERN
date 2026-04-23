# Trello_Clone
# 🚀 Trello Lite (MERN Stack)

A full-stack **Trello-like Task Management Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.

---

## ✨ Features

### 🔐 Authentication

* User Register & Login
* JWT-based authentication
* Protected routes

### 📋 Boards

* Create new boards
* View all boards
* Switch between boards

### 🗂 Lists (Columns)

* Add lists inside a board
* Drag & reorder lists

### ✅ Cards (Tasks)

* Create tasks inside lists
* Drag & drop between lists
* Task details modal

### 🎯 UI/UX

* Modern clean UI
* Responsive layout
* Modal-based interactions

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* React Router
* @hello-pangea/dnd (Drag & Drop)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📁 Folder Structure

```
client/
│── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── assets/

server/
│── config/
│── controller/
│── middleware/
│── models/
│── routes/
│── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/trello-lite.git
cd trello-lite
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🔗 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Boards

* `GET /api/boards`
* `POST /api/boards`

### Lists

* `GET /api/lists/:boardId`
* `POST /api/lists`

### Cards

* `GET /api/cards/list/:listId`
* `POST /api/cards`
* `PUT /api/cards/move`

---

## 🚀 Future Improvements

* Edit & delete boards
* Add task descriptions & attachments
* Real-time updates (Socket.io)
* User roles & permissions
* Notifications system

---

## 📸 Screenshots

---

## 👨‍💻 Author

**Mitesh Nadiyapara**

* MERN Stack Developer
* GitHub: https://github.com/your-username

---

## 📄 License

This project is licensed under the MIT License.
