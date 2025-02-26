require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", bookRoutes); 

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected...");
        await sequelize.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
