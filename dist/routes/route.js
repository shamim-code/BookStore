"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controllers/authorController");
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
router.get("/authors", authorController_1.getAllAuthor); //done
router.get("/authors/:id", authorController_1.getAuthorById); //done
router.post("/authors", authorController_1.createAuthor); //done
router.put("/authors/:id", authorController_1.updateAuthor); //done
router.delete("/authors/:id", authorController_1.deleteAuthor); //done
router.get("/books", bookController_1.getAllBooks); //done
router.get("/books/:id", bookController_1.getBookById); //done
router.post("/books", bookController_1.addBook); //done
router.put("/books/:id", bookController_1.updateBook); //done
router.delete("/books/:id", bookController_1.deleteBook); //done
router.get("/books/:author_id/authors", bookController_1.bookListByAuthor1); //done
router.get("/books/author/:id", bookController_1.bookListByAuthor2); //done
exports.default = router;
