import express, {NextFunction, Request, Response} from "express";
import routes from "./routes/routes";
import {connectDB} from "./config/db";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter";
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT

// Middleware
app.use(cors(
    {
        origin:"http://localhost:5173"
    }
))
app.use(express.json()) // middleware parse JSON bodies (req.body)
app.use(rateLimiter)


// app.use((req: Request,  res: Response, next: NextFunction) => {
//     console.log(`Request on: ${req.method} & ${req.url}`)
//     next();
// })

app.use("/api/notes", routes);

// Connect to port after connecting DB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})
