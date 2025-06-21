const Task = require("../models/task");

exports.getTasks = (req, res) => {
  let taskList = Task.getAll();

  if (req.query.completed !== undefined) {
    const isCompleted = req.query.completed === 'true';
    taskList = taskList.filter(t => t.completed === isCompleted);
  }

   if (req.query.sort === 'asc') {
    taskList = taskList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (req.query.sort === 'desc') {
    taskList = taskList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json(taskList);
};

exports.getTask = (req, res) => {
  const task = Task.getById(Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

exports.createTask = (req, res) => {
  const { title, description, completed = false } = req.body;
  if (!title || !description)
    return res.status(400).json({ error: "Title is required" });
  const task = Task.create({ title, description, completed });
  res.status(201).json(task);
};

exports.updateTask = (req, res) => {
  const taskDetails = Task.getById(Number(req.params.id));
  if (!taskDetails) return res.status(404).json({ error: "Task not found" });
  const { title, description, completed } = req.body;
  const task = Task.update(Number(req.params.id), {
    title,
    description,
    completed,
  });
  if (!task || !this.deleteTask || typeof completed != "boolean")
    return res.status(400).json({ error: "Task not found" });
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const deleted = Task.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Task not found" });
  res.status(200).send();
};
