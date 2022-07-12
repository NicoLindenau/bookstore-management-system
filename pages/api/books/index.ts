import type { NextApiRequest, NextApiResponse } from "next"
import connectDb from "../../../util/connectDb"
import { getBooks } from "../../../util/getData"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb()

  // get all books
  if (req.method === "GET") {
    const result = await getBooks(client)
    res.json(result)
  }

  // create a new book
  if (req.method === "POST") {
    const { title, author, amount, price } = req.body
    const newBook = { title, author, amount, price }
    await client.db().collection("books").insertOne(newBook)
    res.json({ message: "book created" })
  }

  client.close()
}

export default handler
