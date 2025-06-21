const fs = require('fs');
const path = require('path');

let tasks = [];
let nextId = 1;
const filePath = path.join(__dirname, '../task.json');

const loadTasks = () => {
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let tasksData = JSON.parse(rawData);
    tasks = tasksData.tasks || [];
    
    const ids = tasks.map(t => t.id);
    nextId = ids.length ? Math.max(...ids) + 1 : 1;
  }
};

const getAll = () => tasks;

const getById = (id) => tasks.find(task => task.id === id);

const create = (data) => {
  if(!data)
    throw new Error('Data is required to create a task');
  if (!data.title)
    throw new Error('Title is required to create a task');
  if (!data.description)
    throw new Error('Description is required to create a task');
  if (typeof data.completed !== 'boolean')
    throw new Error('Completed status must be a boolean');
  if (data.priority && !['low', 'medium', 'high'].includes(data.priority))
    throw new Error('Priority must be one of: low, medium, high');
  if (data.description && typeof data.description !== 'string')
    throw new Error('Description must be a string');

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
