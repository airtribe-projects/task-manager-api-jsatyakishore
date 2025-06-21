const fs = require('fs');
const path = require('path');

let tasks = [];
let nextId = 1;
const filePath = path.join(__dirname, '../task.json');

const loadTasks = () => {
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    let tasksData = JSON.parse(rawData);
    tasks = tasksData.tasks || [];
    
    const ids = tasks.map(t => t.id);
    nextId = ids.length ? Math.max(...ids) + 1 : 1;
  }
};

const getAll = () => tasks;

const getById = (id) => tasks.find(task => task.id === id);

const create = (data) => {
  const task = {
    id: nextId++,
    title: data.title,
    description: data.description || '',
    completed: data.completed ?? false,
    priority: data.priority ?? 'medium',
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
};

const update = (id, newData) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return null;
   tasks[index] = {
    ...tasks[index],
    title: newData.title ?? tasks[index].title,
    description: newData.description ?? tasks[index].description,
    completed: newData.completed ?? tasks[index].completed,
    priority: newData.priority ?? tasks[index].priority
  };
  return tasks[index];
};

const remove = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

loadTasks();
const reset = () => { tasks = []; nextId = 1; }; // For testing

module.exports = { getAll, getById, create, update, remove, reset };
