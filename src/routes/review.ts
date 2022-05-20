import { Router, Request, Response } from 'express';
import { Review } from '../schemas/review';
import { AuthRequest } from '../types/auth';
const auth = require('../middlewares/auth');
const ReviewController = require('../controllers/reviewController');
const reviewRouter = Router();

reviewRouter.post("/", async (req: Request, res: Response) => {
  try {
    const review = await ReviewController.createReview(req.body);
    return res.status(201).send(review);
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
});

/* Obtiene las reviews dado el id de un anime */
reviewRouter.get("/anime/:id", async (req: Request, res: Response) => {
  try {
    const animeId = req.params.id;
    const reviews = await Review.find({ 'key.animeId': animeId });
    return res.status(200).send(reviews);
  } catch (err: any) {
    return res.status(400).send({ message: err.message });
  }
});

/* Obtiene las reviews de un usuario, solo requiere el token */
reviewRouter.get("/user", auth, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) throw Error("Usuario no encontrado.");
    const email = user.email;
    const reviews = await Review.find({ 'key.email': email });

    res.status(200).send(reviews);
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});


reviewRouter.delete("/", async (req: Request, res: Response) => {
  await Review.deleteMany({});
  return res.status(200).send({ "message": "Las reviews han sido eliminadas" });
});
module.exports = reviewRouter;

