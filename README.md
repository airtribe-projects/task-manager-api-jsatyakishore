# Task Management  (Node.js + Express)

A simple RESTful API to manage tasks with in-memory data storage. Built with Node.js and Express.js.

## 📌 Features

- In-memory data management with optional file persistence (`task.json`)
- CRUD operations for tasks
- Filter tasks by completion status (`/tasks?completed=true`)
- Sort tasks by creation date (`/tasks?sort=asc`)
- Prioritize tasks (`low`, `medium`, `high`)
- Fetch tasks by priority (`/tasks/priority/high`)
- Input validation and structured error handling
- Fully testable using Postman or `curl`

---

## 📦 Installation

```bash
git clone https://github.com/airtribe-projects/airtribe-engineering-learners-task-manager-api-task-manager.git
cd task-api
npm install

```

## 📦 Project Structure
```
task-api/
├── controllers/
│   └── taskController.js
├── routes/
│   └── taskRoutes.js
├── models/
│   └── task.js
├── tests/
│   └── task.test.js
├── app.js
├── package.json
└── README.md
```

## 📬 API Endpoints

| Method | Endpoint            | Description            | Request Body (JSON)               |
|--------|---------------------|------------------------|-----------------------------------|
| GET    | `/tasks`        | Get all tasks          | –                                 |
| GET    | `/tasks/:id`    | Get task by ID         | –                                 |
| POST   | `/tasks`        | Create a new task      | `{ "title": "Task title", "completed": false }` |
| PUT    | `/tasks/:id`    | Update existing task   | `{ "title": "New title", "completed": true }`   |
| DELETE | `/tasks/:id`    | Delete a task          | –                                 |
