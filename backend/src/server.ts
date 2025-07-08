import express, {NextFunction, Request, Response} from "express";
import routes from "./routes/routes";
import {connectDB} from "./config/db";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter";
import cors from "cors"
import path from "path"

dotenv.config()

const app = express();
const PORT = process.env.PORT
// const __dirname = path.resolve()

// Middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors(
        {
            origin:"http://localhost:5173"
        }
    ))
}
app.use(express.json()) // middleware parse JSON bodies (req.body)
app.use(rateLimiter)


// app.use((req: Request,  res: Response, next: NextFunction) => {
//     console.log(`Request on: ${req.method} & ${req.url}`)
//     next();
// })

app.use("/api/notes", routes);

if(process.env.NODE_ENV === "production" ) {
    app.use(express.static(path.join(__dirname,"../../frontend/dist")))

    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname,"../../frontend", "dist", "index.html"))
    })
}

// Connect to port after connecting DB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})
