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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const review_1 = require("../schemas/review");
const createReview = (request) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    Crea una review a partir de los datos obtenidos del body en formato json.
    El request sigue la estructura de ReviewRequest.post.
    */
    try {
        const key = {
            email: request.email,
            animeId: request.animeId,
        };
        const review = new review_1.Review({ key, text: request.text });
        yield review.save();
        return review;
    }
    catch (err) {
        //if (err.code === 11000) throw new Error("La review ya existe.");
        if (err == mongoose_1.default.Error.ValidationError)
            throw new Error("Datos de la review son inválidos.");
        throw err;
    }
});
module.exports = {
    createReview,
};
