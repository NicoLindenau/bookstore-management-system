import type { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "../../util/db"
import { ObjectId } from "mongodb"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()

  // get all customers
  if (req.method === "GET") {
    const result = await client.db().collection("customers").find().toArray()
    res.json(result)
  }

  // create a new customer
  if (req.method === "POST") {
    const { firstName, lastName, purchases, inactive } = req.body
    const newCustomer = { firstName, lastName, purchases, inactive }
    await client.db().collection("customers").insertOne(newCustomer)
    res.json({ message: "customer created" })
  }

  // update a customer
  if (req.method === "PUT") {
    const { id, firstName, lastName, purchases, inactive } = req.body
    const updatedCustomer = { firstName, lastName, purchases, inactive }
    await client
      .db()
      .collection("customers")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedCustomer })
    res.json("customer updated")
  }

  client.close()
}

export default handler
