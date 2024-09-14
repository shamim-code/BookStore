import knex from "knex";
import config from "../db/knexfile";

import { Request, Response } from "express";
import { authorSchema } from "../validationSchema/joiValidation";

const db = knex(config.development);

// Return All Authors
const getAllAuthor = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from("author");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Failed to get authors" });
  }
};

// Return a single author by id
const getAuthorById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await db
      .select("id", "name", "bio", "dob")
      .from("author")
      .where("id", id);
    res.status(200).json({data: data});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get author" });
  }
};

// Create a new author
const createAuthor = async (req: Request, res: Response) => {
  const { name, bio, dob } = req.body;

  const { error } = authorSchema.validate(req.body, {
    abortEarly: false,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorlist = error.details.map((error) => error.message);
    return res.status(400).json({ status: "Invalid Input", error: errorlist });
  }

  try {
    const [id] = await db("author").insert({ name, bio, dob }).returning("id");
    res
      .status(201)
      .send({
        message: "Author created successfully",
        data: { id, name, bio, dob },
      });
  } catch (error) {
    console.error("Error inserting author:", error);
    res.status(500).json({ error: "Failed to create author" });
  }
};

// Update an existing author by id
const updateAuthor = async (req: Request, res: Response) => {
  const { name, bio, dob } = req.body;

  const { error } = authorSchema.validate(req.body, {
    abortEarly: false,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorlist = error.details.map((error) => error.message);
    return res.status(400).json({ status: "Invalid Input", error: errorlist });
  }

  try {
    const data = await db("author")
      .where("id", req.params.id)
      .update({ name, bio, dob });
    res
      .status(200)
      .send({ message: "Author updated successfully", Updated_Data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update author" });
  }
};

const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const data = await db("author").where("id", req.params.id).del();
    res
      .status(200)
      .send({
        message: "Author deleted successfully",
        deleted_id: req.params.id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete author" });
  }
};

export {
  getAllAuthor,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
