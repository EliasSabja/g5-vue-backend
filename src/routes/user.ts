import { Router, Request, Response } from 'express';
import { User } from '../schemas/user';
//import { IUser, UserPostRequest } from '../types/user';
const UserController = require('../controllers/userController');

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = await UserController.createUser(req.body);
    return res.status(201).send(user);
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
});

userRouter.delete("/", async (req: Request, res: Response) => {
  await User.deleteMany({});
  return res.status(200).send({ "message": "Los usuarios han sido eliminados" });
});

module.exports = userRouter;
