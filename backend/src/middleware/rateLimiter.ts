import {NextFunction} from "express";
import {Request, Response} from "express";
import rateLimit from "../config/upstash";

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {success} = await rateLimit.limit("my-limit-key")

        if (!success) {
            res.status(429).json({
                message: "Too many request, please try again later"
            })
            return;
        }
        next();
    } catch (error) {
        console.log("Rate Limit error", error);
        next(error);
    }
}

export default rateLimiter