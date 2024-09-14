"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = exports.authorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const authorSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    bio: joi_1.default.string().optional(),
    dob: joi_1.default.date().iso().required()
});
exports.authorSchema = authorSchema;
const bookSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    pulishedDate: joi_1.default.date().iso().required(),
    authorId: joi_1.default.number().required()
});
exports.bookSchema = bookSchema;
