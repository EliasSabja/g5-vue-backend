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
const user_1 = require("../schemas/user");
const createUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    Crea un usuario a partir de los datos obtenidos del body en formato json.
    El request sigue la estructura de UserRequest.post.
    */
    try {
        const newUser = Object.assign(Object.assign({}, request), { animes: [] });
        const user = new user_1.User(request);
        yield user.save();
        return user;
    }
    catch (err) {
        if (err.code === 11000)
            throw new Error("El usuario ya existe.");
        if (err == mongoose_1.default.Error.ValidationError)
            throw new Error("Datos de usuario inválidos.");
        throw err;
    }
});
module.exports = {
    createUser,
};
