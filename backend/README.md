
# To-Do List Backend API

A simple RESTful backend API for a To-Do List application built using Node.js, Express.js, and MongoDB.

---

## Features

- Create, Read, Update, Delete (CRUD) tasks
- Filter tasks by status and priority
- Search tasks by title or description
- Mark tasks as completed
- Input validation and error handling

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Prerequisites

- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm

---

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/sruthimallireddy/tda8.git>
cd backend
Install dependencies:
bash
npm install
Create a .env file:
Copy code
cp .env.example .env
Update environment variables:
env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-list
Running the Project
Development
bash
npm run dev
Production
bash
npm start
Server runs at:
http://localhost:5000