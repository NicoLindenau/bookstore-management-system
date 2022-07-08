import type { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "../../util/db"
import { ObjectId } from "mongodb"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()
  const a = 6
  if (req.method === "GET") {
    const result = await client
      .db()
      .collection("books")
      .updateOne(
        { _id: new ObjectId("62c7a9aeaebd00aaeeeba429") },
        { $inc: { stock: a } }
      )
    res.json(result)
  }

  client.close()
}

export default handler
