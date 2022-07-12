import type { NextApiRequest, NextApiResponse } from "next"
import type { OrderedBook } from "../../../types"
import { ObjectId } from "mongodb"
import connectDb from "../../../util/connectDb"
import { getOrderById } from "../../../util/getData"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb()
  const orderId = req.query.orderId

  // get an order by id
  if (req.method === "GET") {
    const result = await getOrderById(client, orderId as string)
    res.json(result)
  }

  // cancel an order
  // update the amount of the books
  if (req.method === "PUT") {
    const updatedOrder = { cancelled: true }

    const result = await client
      .db()
      .collection("orders")
      .findOneAndUpdate(
        { _id: new ObjectId(orderId as string) },
        { $set: updatedOrder }
      )

    await Promise.all(
      result.value?.books.map(async (book: OrderedBook) => {
        return await client
          .db()
          .collection("books")
          .updateOne(
            { _id: new ObjectId(book.bookId) },
            { $inc: { amount: book.amount } }
          )
      })
    )

    res.json({ message: "order cancelled" })
  }
  client.close()
}

export default handler
