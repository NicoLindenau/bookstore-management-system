import { MongoClient, ObjectId } from "mongodb"

export const getBooks = async (client: MongoClient) => {
  const result = await client.db().collection("books").find().toArray()
  return result
}

export const getBookById = async (client: MongoClient, id: string) => {
  const result = await client
    .db()
    .collection("books")
    .find({ _id: new ObjectId(id) })
    .toArray()
  return result
}

export const getCustomers = async (client: MongoClient) => {
  const result = await client.db().collection("customers").find().toArray()
  return result
}

export const getCustomerById = async (client: MongoClient, id: string) => {
  const result = await client
    .db()
    .collection("customers")
    .find({ _id: new ObjectId(id) })
    .toArray()
  return result
}

export const getOrders = async (client: MongoClient) => {
  const result = await client.db().collection("orders").find().toArray()
  return result
}

export const getOrderById = async (client: MongoClient, id: string) => {
  const result = await client
    .db()
    .collection("orders")
    .find({ _id: new ObjectId(id) })
    .toArray()
  return result
}

export const getLatestData = async (client: MongoClient) => {
  const booksResult = await client
    .db()
    .collection("books")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray()
  const customersResult = await client
    .db()
    .collection("customers")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray()
  const ordersResult = await client
    .db()
    .collection("orders")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray()

  return [booksResult, customersResult, ordersResult]
}
