import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Review } from '../schemas/review';
import { ReviewPostRequest } from '../types/review';

const createReview = async (request: ReviewPostRequest) => {
  /*
  Crea una review a partir de los datos obtenidos del body en formato json.
  El request sigue la estructura de ReviewRequest.post.
  */
  try {
    const key = {
      email: request.email,
      animeId: request.animeId,
    };
    const review = new Review({ key, text: request.text });
    await review.save();
    return review;
  } catch (err: any) {
    //if (err.code === 11000) throw new Error("La review ya existe.");
    if (err == mongoose.Error.ValidationError) throw new Error("Datos de la review son inválidos.");
    throw err;
  }
};

module.exports = {
  createReview,
};
