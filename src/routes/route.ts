import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
} from "../controllers/authorController";
import {
  addBook,
  bookListByAuthor1,
  bookListByAuthor2,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController";

const router = express.Router();

router.get("/authors", getAllAuthor); //done

router.get("/authors/:id", getAuthorById); //done

router.post("/authors", createAuthor); //done

router.put("/authors/:id", updateAuthor); //done

router.delete("/authors/:id", deleteAuthor); //done

router.get("/books", getAllBooks); //done

router.get("/books/:id", getBookById); //done

router.post("/books", addBook); //done

router.put("/books/:id", updateBook); //done

router.delete("/books/:id", deleteBook); //done

router.get("/books/:author_id/authors", bookListByAuthor1); //done

router.get("/books/author/:id", bookListByAuthor2); //done

export default router;
