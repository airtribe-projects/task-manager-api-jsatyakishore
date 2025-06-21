const express = require('express');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
