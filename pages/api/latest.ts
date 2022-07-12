import type { NextApiRequest, NextApiResponse } from "next"
import connectDb from "../../util/connectDb"
import { getLatestData } from "../../util/getData"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDb()

  // get latest book, customer and order
  if (req.method === "GET") {
    const result = await getLatestData(client)
    res.json(result)
  }

  client.close()
}

export default handler
