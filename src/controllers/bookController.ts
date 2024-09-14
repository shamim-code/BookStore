import knex from "knex";
import config from "../db/knexfile";
import { Request, Response } from "express";
import { bookSchema } from "../validationSchema/joiValidation";

const db = knex(config.development);

// Retrive all the books in the database
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await db("books").select();
    res.status(200).send({ Status: "success", data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving books", error });
  }
};

// Retrive a single book by its id
const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await db("books").where("id", req.params.id);
    res.status(200).send({ Status: "success", data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving book", error });
  }
};

// Add a new book to the database
const addBook = async (req: Request, res: Response) => {
  const book = req.body;

  const checkAuthor = await db("author")
    .select("id")
    .where("id", book.authorId);

  if (checkAuthor.length === 0) {
    return res
      .status(400)
      .json({ status: "Invalid Input", error: "Author not found" });
  }

  const { error } = bookSchema.validate(req.body, {
    abortEarly: false,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorlist = error.details.map((error) => error.message);
    return res.status(400).json({ status: "Invalid Input", error: errorlist });
  }

  try {
    const [id] = await db("books")
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
  } catch (error) {
    return res.status(500).json({ message: "Error creating book", error });
  }
};

// update a single existing book information by its id
const updateBook = async (req: Request, res: Response) => {
  const { title, description, pulishedDate, authorId } = req.body;

  const checkAuthor = await db("author").select("id").where("id", authorId);

  if (checkAuthor.length === 0) {
    return res
      .status(400)
      .json({ status: "Invalid Input", error: "Author not found" });
  }

  const { error } = bookSchema.validate(req.body, {
    abortEarly: false,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorlist = error.details.map((error) => error.message);
    return res.status(400).json({ status: "Invalid Input", error: errorlist });
  }

  try {
    const data = await db("books")
      .update({
        title: title,
        description: description,
        published_date: pulishedDate,
        author_id: authorId,
      })
      .where("id", req.params.id);

    res.status(200).send({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating book", error });
  }
};

// Delete a single book by its id
const deleteBook = async (req: Request, res: Response) => {
  const checkAuthor = await db("author")
    .select("id")
    .where("id", req.params.id);

  if (checkAuthor.length === 0) {
    return res
      .status(400)
      .json({ status: "Invalid Input", error: "Author not found" });
  }

  try {
    const data = await db("books").where("id", req.params.id).del();
    res.status(200).send({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting book", error });
  }
};

// Retrive all the books by a specific author
const bookListByAuthor1 = async (req: Request, res: Response) => {
  try {
    const data = await db("books").select().where("author_id", req.params.id);
    res.status(200).send({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Theere is an error", error });
  }
};

// Retrive all the books by a specific author
const bookListByAuthor2 = async (req: Request, res: Response) => {
  try {
    const data = await db("books").select().where("author_id", req.params.id);
    res.status(200).send({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Theere is an error", error });
  }
};

export {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  bookListByAuthor1,
  bookListByAuthor2,
};
