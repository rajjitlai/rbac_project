const express = require('express');
const authRoutes = require('./auth');
const rbacRoutes = require('./routes/rbac');
const shoppingRoutes = require('./routes/shopping');
const todoRoutes = require('./routes/todo');
require('dotenv').config();

const app = express();
app.use(express.json());

// frontend connection
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))


app.use('/auth', authRoutes);
app.use('/rbac', rbacRoutes);
app.use('/shopping', shoppingRoutes);
app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port https://localhost:${PORT}`);
});
