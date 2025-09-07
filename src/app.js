import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: '50kb'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


// Routes
import userRoutes from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRoutes);

//http://localhost:2000/api/v1/users/register

export default app;