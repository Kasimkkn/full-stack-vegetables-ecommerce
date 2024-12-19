import express from "express";
import { deleteUser, getAllUsers, getUser, loginUser, newUser, updateUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();


app.post("/new", newUser)
app.post("/login", loginUser);
app.put("/update/:id", updateUser);
app.get("/all", adminOnly, getAllUsers);

app.route("/:id").get(getUser).delete(adminOnly, deleteUser);


export default app;