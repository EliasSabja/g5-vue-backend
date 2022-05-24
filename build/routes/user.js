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
const user_1 = require("../schemas/user");
//import { IUser, UserPostRequest } from '../types/user';
const auth = require('../middlewares/auth');
const UserController = require('../controllers/userController');
const userRouter = (0, express_1.Router)();
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserController.createUser(req.body);
        return res.status(201).send(user);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}));
userRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.User.deleteMany({});
    return res.status(200).send({ "message": "Los usuarios han sido eliminados" });
}));
userRouter.post("/anime", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUser = req.user;
        if (!reqUser)
            throw Error("Usuario no encontrado");
        const email = reqUser.email;
        if (!email)
            throw Error("Usuario no encontrado");
        // Se verifica existencia del usuario
        const user = yield user_1.User.findOne({ email });
        if (!user)
            throw Error("Usuario no encontrado");
        // Si hay un id de anime en el body se agrega al usuario
        const animeId = parseInt(req.body.animeId);
        if (!animeId)
            throw Error("Anime Id no es válido.");
        user.animes.push(animeId);
        yield user.save();
        res.status(200).send({ user });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
}));
module.exports = userRouter;
