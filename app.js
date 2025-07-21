require('dotenv').config();
const express = require('express');
const sequelize = require('./models');
const authRoutes = require('./routes/auth.routes');
const rbacRoutes = require('./routes/rbac.routes');

const app = express();
app.use(express.json());

app.use('/api', authRoutes)
app.use('/api', rbacRoutes)

const PORT = process.env.PORT || 3000;

sequelize.sync({alter: true}).then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})