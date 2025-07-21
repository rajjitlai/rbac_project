require('dotenv').config();
const express = require('express');
const sequelize = require('./models');
const User = require('./models/User');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());

app.use('/api', authRoutes)

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})