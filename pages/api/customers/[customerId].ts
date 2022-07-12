import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import connectDb from "../../../util/connectDb"
import { getCustomerById } from "../../../util/getData"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb()
  const customerId = req.query.customerId

  // get a customer by id
  if (req.method === "GET") {
    const result = await getCustomerById(client, customerId as string)
    res.json(result)
  }

  // update a customer
  if (req.method === "PUT") {
    const { firstName, lastName } = req.body
    const updatedCustomer = { firstName, lastName }
    await client
      .db()
      .collection("customers")
      .updateOne(
        { _id: new ObjectId(customerId as string) },
        { $set: updatedCustomer }
      )
    res.json({ message: "customer updated" })
  }

  // unsubscribe a customer
  if (req.method === "PATCH") {
    const updatedCustomer = { subscribed: false }
    await client
      .db()
      .collection("customers")
      .updateOne(
        { _id: new ObjectId(customerId as string) },
        { $set: updatedCustomer }
      )
    res.json({ message: "customer unsubscribed" })
  }

  client.close()
}

export default handler
