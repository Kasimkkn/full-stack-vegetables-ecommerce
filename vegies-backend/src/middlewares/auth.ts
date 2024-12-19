import { NextFunction, Request } from "express";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";


// check admin is there or not
export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("login Please !", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Credential", 401));
  if (user.role !== "admin")
    return next(new ErrorHandler("Only Admin Can Access ", 403));

  next();
});


interface JwtPayload {
  id: string;
  role: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}


export const protect = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new ErrorHandler("Not authorized, no token", 401));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as JwtPayload;

      req.user = { id: decoded.id, role: decoded.role };

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return next(
          new ErrorHandler("Not authorized to access this resource", 403)
        );
      }

      next();
    } catch (error) {
      return next(new ErrorHandler("Not authorized, invalid token", 401));
    }
  };
};