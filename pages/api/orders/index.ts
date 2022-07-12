import type { NextApiRequest, NextApiResponse } from "next"
import type { OrderedBook } from "../../../types"
import { ObjectId } from "mongodb"
import connectDb from "../../../util/connectDb"
import { getOrders } from "../../../util/getData"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb()

  // get all orders
  if (req.method === "GET") {
    const result = await getOrders(client)
    res.json(result)
  }

  // create an order
  // update orders of the customer
  // update the amount of the books
  if (req.method === "POST") {
    const { books, customerId, totalPrice } = req.body
    const newOrder = { books, customerId, totalPrice, cancelled: false }
    const result = await client.db().collection("orders").insertOne(newOrder)

    await client
      .db()
      .collection("customers")
      .updateOne(
        { _id: new ObjectId(customerId) },
        { $push: { orders: result.insertedId.toString() } }
      )

    await Promise.all(
      books.map(async (book: OrderedBook) => {
        return await client
          .db()
          .collection("books")
          .updateOne(
            { _id: new ObjectId(book.bookId) },
            { $inc: { amount: -book.amount } }
          )
      })
    )

    res.json({ message: "order created" })
  }

  client.close()
}

export default handler
