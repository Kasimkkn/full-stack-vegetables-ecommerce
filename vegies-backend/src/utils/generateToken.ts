import jwt from "jsonwebtoken";

const generateToken = (id: string, role: string): string => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || "helloWorld@123", {
        expiresIn: "7d",
    });
};

export default generateToken;
