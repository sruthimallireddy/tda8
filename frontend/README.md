# To-Do List Frontend
A React-based frontend application for managing daily tasks. It connects to a backend API to create, update, and manage to-do items.
## Features
- Create, view, update, and delete tasks
- Search and filter tasks
- Mark tasks as completed
- Responsive and user-friendly UI
## Tech Stack
- React
- JavaScript
- CSS
- Axios
## Prerequisites
- Node.js (v14 or higher)
- npm
- Backend API running
## Installation
1. Clone the repository:
git clone <https://github.com/sruthimallireddy/tda8.git>
cd frontend
Install dependencies:
npm install
Create a .env file:
cp .env.example .env
Update API URL in .env:
env
REACT_APP_API_URL=http://localhost:5000/api
Running the Application
npm start
The app will run at:
http://localhost:3000
API Connection

The frontend communicates with the backend using REST APIs to:

Fetch tasks

Create new tasks

Update existing tasks

Delete tasks

Build for Production
npm run build
Author
sruthi mallireddy