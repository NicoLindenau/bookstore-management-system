import type { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "../../util/db"
import { ObjectId } from "mongodb"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()

  // get all purchases
  if (req.method === "GET") {
    const result = await client.db().collection("purchases").find().toArray()
    res.json(result)
  }

  // create a purchase
  // update purchases of the customer
  // update the stock of the books
  if (req.method === "POST") {
    const { books, customerId, totalPrice, cancelled } = req.body
    const newPurchase = { books, customerId, totalPrice, cancelled }

    const result = await client
      .db()
      .collection("purchases")
      .insertOne(newPurchase)

    await client
      .db()
      .collection("customers")
      .updateOne(
        { _id: new ObjectId(customerId) },
        { $push: { purchases: result.insertedId } }
      )

    await Promise.all(
      books.map(async (book) => {
        return await client
          .db()
          .collection("books")
          .updateOne(
            { _id: new ObjectId(book.bookId) },
            { $inc: { stock: -book.amount } }
          )
      })
    )

    res.json({ message: "purchase created" })
  }

  // set purchase to cancelled/ not cancelled
  // update the stock of the books
  if (req.method === "PUT") {
    const { id, cancelled } = req.body
    const updatedPurchase = { cancelled }

    const result = await client
      .db()
      .collection("purchases")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedPurchase })

    await Promise.all(
      result.value?.books.map(async (book) => {
        return await client
          .db()
          .collection("books")
          .updateOne(
            { _id: new ObjectId(book.bookId) },
            { $inc: { stock: book.amount } }
          )
      })
    )

    res.json("purchase updated")
  }
  client.close()
}

export default handler
