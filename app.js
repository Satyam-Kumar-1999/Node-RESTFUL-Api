require("dotenv").config();
const express = require("express")
const app = express()
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000
const products_routes = require("./routes/products");

app.get("/", (req, res) => {
    res.send("Welcome.");
});
app.use(express.json());
app.use("/api/products", products_routes);

const SERVER_CONFIG = async() => {

    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Server Listening To Port ${PORT}`)

        });
    } catch (error) {
        console.error(error);
    }
}
SERVER_CONFIG();