import { MongoClient } from "mongodb"

const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string)
  return client
}

export default connectToDatabase
