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
const user_1 = require("../schemas/user");
const jwt = require("jsonwebtoken");
const loginResponse = (message, user) => {
    return { message, user };
};
const loginUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // Validacion de existencia del usuario
    let message = "success";
    const user = yield user_1.User.findOne({ email: body.email });
    if (!user)
        return loginResponse("User not found.");
    // Validacion de la contrasena
    const passwordIsCorrect = yield user.validatePassword(body.password);
    if (!passwordIsCorrect)
        return loginResponse("Invalid password.");
    const userData = {
        email: user.email,
    };
    return loginResponse(message, userData);
});
const generateToken = (user) => {
    // Generacion del JSON Web Token
    const token = jwt.sign({
        email: user.email,
    }, process.env.TOKEN);
    return token;
};
module.exports = {
    loginResponse,
    loginUser,
    generateToken,
};
