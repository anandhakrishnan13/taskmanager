
# Collaborative Task Manager (MERN Stack)

A simple and responsive task management web application built with the **MERN Stack**. Users can create tasks, assign them to team members, update statuses, and filter by assignee or progress — all in a clean, modular interface.

---

## Tech Stack

- **Frontend**: React.js (Functional Components with Hooks)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (via Mongoose)
- **Styling**: Custom CSS (with responsive UI)
- **Version Control**: Git + GitHub

---

## Features

- Create a new task with:
  - Title
  - Description
  - Assigned To
- View all tasks
- Filter by:
  - Status (`To Do`, `In Progress`, `Done`)
  - Assignee (via hamburger menu)
- Update task status
- Delete tasks
- Navigate with React Router
- Clean, user-friendly UI

---

## Project Structure

```
TaskManager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── EditTask.jsx
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.css
│   │   │   ├── EditTask.css
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── db.js
│   ├── server.js
│   └── package.json
```

---

## 🛠️ Installation & Running

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-task-manager.git
cd taskmanager
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` with:

```
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=3000
```

Start the backend:

```bash
node server.js
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## API Endpoints

### `GET /tasks`
- Fetch all tasks

### `POST /tasks`
- Create a task  
**Body:**
```json
{
  "title": "Design Homepage",
  "description": "Create responsive UI",
  "assignedTo": "Alice"
}
```

### `PATCH /tasks/:id`
- Update task status  
**Body:**
```json
{
  "status": "Done"
}
```

### `DELETE /tasks/:id`
- Delete a task

---

## Team Roles

| Role | Description |
|------|-------------|
| Frontend Dev | Built React UI, implemented routing, and API integration |
| Backend Dev | Built Express API and handled Mongoose models |
| DB Manager | Designed MongoDB schema and ensured data handling |
| Tester/QA | Verified all functionality and filters |

---

