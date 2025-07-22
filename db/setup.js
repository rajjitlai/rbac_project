const sequelize = require('./index')
const { User, Role, Permission } = require("../models")

const setupDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log("Database setup complete");
}

setupDatabase()