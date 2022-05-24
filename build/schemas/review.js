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
exports.Review = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { isEmail } = require('validator');
const { Schema, model } = mongoose_1.default;
const user_1 = require("../schemas/user");
const ReviewSchema = new Schema({
    key: { unique: true, type: Schema.Types.Mixed, required: true },
    text: { type: String, required: true },
});
ReviewSchema.pre("save", function save(next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findOne({ email: this.key.email });
            if (!user)
                throw Error("El usuario que está escribiendo la review no existe.");
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.Review = model("Review", ReviewSchema);
