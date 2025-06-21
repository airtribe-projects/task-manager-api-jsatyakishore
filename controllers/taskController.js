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

  if(taskList && taskList.length === 0) {
    return res.status(404).json({ error: "No tasks found" });
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
  if (!title)
    return res.status(400).json({ error: "Title is required" });
  else if (!description)
    return res.status(400).json({ error: "Description is required" });
  
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
  if (!task || !this.deleteTask )
    return res.status(400).json({ error: "Task not found" });
  else if (!title)
    return res.status(400).json({ error: "Title is required" });
  else if (!description)
    return res.status(400).json({ error: "Description is required" });
  else if (completed === undefined || typeof completed != "boolean")
    return res.status(400).json({ error: "Completed status is required" });
  

  res.json(task);
};

exports.deleteTask = (req, res) => {
  const deleted = Task.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Task not found" });
  res.status(200).json({deleted : false} );
};
