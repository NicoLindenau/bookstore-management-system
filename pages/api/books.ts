import type { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "../../util/db"
import { ObjectId } from "mongodb"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()

  // get all books
  if (req.method === "GET") {
    const result = await client.db().collection("books").find().toArray()
    res.json(result)
  }

  // create a new book
  if (req.method === "POST") {
    const { title, author, stock, price } = req.body
    const newBook = { title, author, stock, price }
    await client.db().collection("books").insertOne(newBook)
    res.json({ message: "book created" })
  }

  // update a book
  if (req.method === "PUT") {
    const { id, title, author, stock, price } = req.body
    const updatedBook = { title, author, stock, price }
    await client
      .db()
      .collection("books")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedBook })
    res.json("book updated")
  }

  client.close()
}

export default handler
