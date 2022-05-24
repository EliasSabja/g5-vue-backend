import { Router, Request, Response } from 'express';
import { User } from '../schemas/user';
import { AuthRequest } from '../types/auth';
//import { IUser, UserPostRequest } from '../types/user';
const auth = require('../middlewares/auth');

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

userRouter.post("/anime", auth, async (req: AuthRequest, res: Response) => {
  try {
    const reqUser = req.user;
    if (!reqUser) throw Error("Usuario no encontrado");

    const email = reqUser.email!;
    if (!email) throw Error("Usuario no encontrado");
    // Se verifica existencia del usuario
    const user = await User.findOne({ email });
    if (!user) throw Error("Usuario no encontrado");
    
    // Si hay un id de anime en el body se agrega al usuario
    const animeId = parseInt(req.body.animeId);
    if (!animeId) throw Error("Anime Id no es válido.");
    user.animes.push(animeId);
    await user.save();

    res.status(200).send({ user });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }

});


module.exports = userRouter;
