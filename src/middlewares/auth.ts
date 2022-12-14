import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth  = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        //fazer verificação de auth
        let success = false;
        
        if(req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try {
                    const decoded = JWT.verify(
                        token,
                        process.env.SECRET_KEY as string
                    );
                    console.log("DECODED", decoded);
                    success = true;
                } catch (error) {
                }
            }
        }
        
        if(success) {
            next();
        } else {
            res.status(403); //Not authorized
            res.json({ error: "Not authorized" });
        }

    }
}