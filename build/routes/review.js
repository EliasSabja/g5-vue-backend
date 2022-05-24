"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_1 = require("../schemas/review");
const auth = require('../middlewares/auth');
const ReviewController = require('../controllers/reviewController');
const reviewRouter = (0, express_1.Router)();
reviewRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield ReviewController.createReview(req.body);
        return res.status(201).send(review);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}));
/* Obtiene las reviews dado el id de un anime */
reviewRouter.get("/anime/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeId = parseInt(req.params.id);
        const reviews = yield review_1.Review.find({ 'key.animeId': animeId });
        return res.status(200).send(reviews);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}));
/* Obtiene las reviews de un usuario, solo requiere el token */
reviewRouter.get("/user", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            throw Error("Usuario no encontrado.");
        const email = user.email;
        const reviews = yield review_1.Review.find({ 'key.email': email });
        res.status(200).send(reviews);
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
}));
reviewRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield review_1.Review.deleteMany({});
    return res.status(200).send({ "message": "Las reviews han sido eliminadas" });
}));
module.exports = reviewRouter;
