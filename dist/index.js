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
const database_1 = __importDefault(require("./database"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
dotenv_1.default.config();
const port = process.env.PORT || 5000;
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { year, title, startDate, endDate } = req.body;
    try {
        database_1.default.connect();
        yield database_1.default.query('BEGIN');
        yield database_1.default.query('INSERT INTO crud (year, title, start_date, end_date) VALUES ($1, $2, $3, $4)', [year, title, startDate, endDate]);
        yield database_1.default.query('COMMIT');
        res.status(200).send('data add to database');
    }
    catch (e) {
        yield database_1.default.query('ROLLBACK');
        console.error(e);
        res.status(500).send('Error adding data to database');
    }
    finally {
        yield database_1.default.end();
    }
}));
app.listen(port, () => {
    console.log(`${port} listening `);
});
