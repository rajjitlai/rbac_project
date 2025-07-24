const express = require('express');
const authRoutes = require('./auth');
const rbacRoutes = require('./routes/rbac');
const shoppingRoutes = require('./routes/shopping');
const todoRoutes = require('./routes/todo');
require('dotenv').config();
const swaggerDocs = require('./swagger');
const cors = require('cors');

const app = express();
app.use(express.json());

// frontend connection
app.use(cors({
    origin: '*',
    credentials: true
}))


app.use('/auth', authRoutes);
app.use('/rbac', rbacRoutes);
app.use('/shopping', shoppingRoutes);
app.use('/todo', todoRoutes);

// swagger
swaggerDocs(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port https://localhost:${PORT}`);
});
