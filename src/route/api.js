import express from "express";
import userController from "../controller/user-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
// userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', authMiddleware, userController.get);
userRouter.patch('/api/users/current', authMiddleware, userController.update);
userRouter.delete('/api/users/logout', authMiddleware, userController.logout);
export {
    userRouter
}