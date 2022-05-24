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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { isEmail } = require('validator');
const { Schema, model } = mongoose_1.default;
const SALT_WORK_FACTOR = 10;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        createIndexes: { unique: true },
        validate: [isEmail, "Mail inválido."]
    },
    animes: [{ type: Number, required: true }],
    password: { type: String, required: true },
});
UserSchema.pre("save", function save(next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        try {
            const salt = yield bcryptjs_1.default.genSalt(SALT_WORK_FACTOR);
            this.password = yield bcryptjs_1.default.hash(this.password, salt);
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
UserSchema.methods.validatePassword = function validatePassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
exports.User = model("User", UserSchema);
