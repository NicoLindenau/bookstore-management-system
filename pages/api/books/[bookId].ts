import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import connectDb from "../../../util/connectDb"
import { getBookById } from "../../../util/getData"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb()
  const bookId = req.query.bookId

  // get a book by id
  if (req.method === "GET") {
    const result = await getBookById(client, bookId as string)
    res.json(result)
  }

  // update a book
  if (req.method === "PUT") {
    const { title, author, amount, price } = req.body
    const updatedBook = { title, author, amount, price }
    await client
      .db()
      .collection("books")
      .updateOne({ _id: new ObjectId(bookId as string) }, { $set: updatedBook })
    res.json({ message: "book updated" })
  }

  client.close()
}

export default handler
