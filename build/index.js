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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
var cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
const port = process.env.PORT;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const DB_URL = process.env.MONGO_URL;
    yield mongoose_1.default.connect(`${DB_URL}`);
});
app.get('/', (req, res) => {
    res.send("Express app con db! :D");
});
app.use(express_1.default.json());
app.use("/api", index_1.default);
run().then(result => app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})).catch(err => console.log(err));
