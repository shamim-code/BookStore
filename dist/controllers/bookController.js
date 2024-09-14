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
exports.bookListByAuthor2 = exports.bookListByAuthor1 = exports.deleteBook = exports.updateBook = exports.addBook = exports.getBookById = exports.getAllBooks = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../db/knexfile"));
const joiValidation_1 = require("../validationSchema/joiValidation");
const db = (0, knex_1.default)(knexfile_1.default.development);
// Retrive all the books in the database
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield db("books").select();
        res.status(200).send({ Status: "success", data: books });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving books", error });
    }
});
exports.getAllBooks = getAllBooks;
// Retrive a single book by its id
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield db("books").where("id", req.params.id);
        res.status(200).send({ Status: "success", data: book });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving book", error });
    }
});
exports.getBookById = getBookById;
// Add a new book to the database
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    const checkAuthor = yield db("author")
        .select("id")
        .where("id", book.authorId);
    if (checkAuthor.length === 0) {
        return res
            .status(400)
            .json({ status: "Invalid Input", error: "Author not found" });
    }
    const { error } = joiValidation_1.bookSchema.validate(req.body, {
        abortEarly: false,
        errors: { wrap: { label: "" } },
    });
    if (error) {
        const errorlist = error.details.map((error) => error.message);
        return res.status(400).json({ status: "Invalid Input", error: errorlist });
    }
    try {
        const [id] = yield db("books")
            .insert({
            title: book.title,
            description: book.description,
            published_date: book.pulishedDate,
            author_id: book.authorId,
        })
            .returning("id");
        return res
            .status(201)
            .json({
            message: "Book created successfully",
            id: id,
            data: {
                title: book.title,
                description: book.description,
                author: book.author,
                authorId: book.authorId,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating book", error });
    }
});
exports.addBook = addBook;
// update a single existing book information by its id
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, pulishedDate, authorId } = req.body;
    const checkAuthor = yield db("author").select("id").where("id", authorId);
    if (checkAuthor.length === 0) {
        return res
            .status(400)
            .json({ status: "Invalid Input", error: "Author not found" });
    }
    const { error } = joiValidation_1.bookSchema.validate(req.body, {
        abortEarly: false,
        errors: { wrap: { label: "" } },
    });
    if (error) {
        const errorlist = error.details.map((error) => error.message);
        return res.status(400).json({ status: "Invalid Input", error: errorlist });
    }
    try {
        const data = yield db("books")
            .update({
            title: title,
            description: description,
            published_date: pulishedDate,
            author_id: authorId,
        })
            .where("id", req.params.id);
        res.status(200).send({ status: "success", data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating book", error });
    }
});
exports.updateBook = updateBook;
// Delete a single book by its id
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkAuthor = yield db("author")
        .select("id")
        .where("id", req.params.id);
    if (checkAuthor.length === 0) {
        return res
            .status(400)
            .json({ status: "Invalid Input", error: "Author not found" });
    }
    try {
        const data = yield db("books").where("id", req.params.id).del();
        res.status(200).send({ status: "success", data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting book", error });
    }
});
exports.deleteBook = deleteBook;
// Retrive all the books by a specific author
const bookListByAuthor1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db("books").select().where("author_id", req.params.id);
        res.status(200).send({ status: "success", data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Theere is an error", error });
    }
});
exports.bookListByAuthor1 = bookListByAuthor1;
// Retrive all the books by a specific author
const bookListByAuthor2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db("books").select().where("author_id", req.params.id);
        res.status(200).send({ status: "success", data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Theere is an error", error });
    }
});
exports.bookListByAuthor2 = bookListByAuthor2;
