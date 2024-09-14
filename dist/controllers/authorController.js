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
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthorById = exports.getAllAuthor = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../db/knexfile"));
const joiValidation_1 = require("../validationSchema/joiValidation");
const db = (0, knex_1.default)(knexfile_1.default.development);
// Return All Authors
const getAllAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db.select().from("author");
        res.status(200).json(data);
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Failed to get authors" });
    }
});
exports.getAllAuthor = getAllAuthor;
// Return a single author by id
const getAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const data = yield db
            .select("id", "name", "bio", "dob")
            .from("author")
            .where("id", id);
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get author" });
    }
});
exports.getAuthorById = getAuthorById;
// Create a new author
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, dob } = req.body;
    const { error } = joiValidation_1.authorSchema.validate(req.body, {
        abortEarly: false,
        errors: { wrap: { label: "" } },
    });
    if (error) {
        const errorlist = error.details.map((error) => error.message);
        return res.status(400).json({ status: "Invalid Input", error: errorlist });
    }
    try {
        const [id] = yield db("author").insert({ name, bio, dob }).returning("id");
        res
            .status(201)
            .send({
            message: "Author created successfully",
            data: { id, name, bio, dob },
        });
    }
    catch (error) {
        console.error("Error inserting author:", error);
        res.status(500).json({ error: "Failed to create author" });
    }
});
exports.createAuthor = createAuthor;
// Update an existing author by id
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, dob } = req.body;
    const { error } = joiValidation_1.authorSchema.validate(req.body, {
        abortEarly: false,
        errors: { wrap: { label: "" } },
    });
    if (error) {
        const errorlist = error.details.map((error) => error.message);
        return res.status(400).json({ status: "Invalid Input", error: errorlist });
    }
    try {
        const data = yield db("author")
            .where("id", req.params.id)
            .update({ name, bio, dob });
        res
            .status(200)
            .send({ message: "Author updated successfully", Updated_Data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update author" });
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db("author").where("id", req.params.id).del();
        res
            .status(200)
            .send({
            message: "Author deleted successfully",
            deleted_id: req.params.id,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete author" });
    }
});
exports.deleteAuthor = deleteAuthor;
