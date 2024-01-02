import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import "dotenv/config";

const authUser =  (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(403).send({ status: false, message: "Token is missing" });
        }

        jwt.verify(token, process.env.TOKEN_KEY as string, { complete: true }, async function(error: VerifyErrors | null, decoded: any) {
            if (error) {
                return res.status(403).send({ status: false, message: "Token verification failed" });
            }
            if (decoded) {
                console.log(decoded);
                req.body.userId = decoded.payload.id;
                next();
            }
        });
    } catch (error) {
        // Handle synchronous errors (e.g., invalid token format, etc.)
        return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};

export default authUser;
