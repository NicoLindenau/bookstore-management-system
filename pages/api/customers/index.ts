import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import connectDb from "../../../util/connectDb"
import { getCustomers } from "../../../util/getData"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb()

  // get all customers
  if (req.method === "GET") {
    const result = await getCustomers(client)
    res.json(result)
  }

  // create a new customer
  if (req.method === "POST") {
    const { firstName, lastName } = req.body
    const newCustomer = { firstName, lastName, orders: [], subscribed: true }
    await client.db().collection("customers").insertOne(newCustomer)
    res.json({ message: "customer created" })
  }

  // update a customer
  if (req.method === "PUT") {
    const { id, firstName, lastName, orders, subscribed } = req.body
    const updatedCustomer = { firstName, lastName, orders, subscribed }
    await client
      .db()
      .collection("customers")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedCustomer })
    res.json({ message: "customer updated" })
  }

  client.close()
}

export default handler
