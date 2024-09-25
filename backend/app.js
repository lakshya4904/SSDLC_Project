import express from "express";
import {connectDB} from "./config/db.js";
import bookRoutes from "../backend/routes/book.route.js";


const app = express();
const PORT = process.env.PORT || 5000;

//middle-ware
app.use(express.json()); //allows us to accept json in the req.body

app.use("/api/books",bookRoutes);

app.listen(PORT,() =>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})