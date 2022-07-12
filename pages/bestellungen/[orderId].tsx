import type { NextPage, GetStaticProps } from "next"
import type { Order } from "../../types"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ImSpinner } from "react-icons/im"
import connectDb from "../../util/connectDb"
import { getOrderById, getOrders } from "../../util/getData"
import { tranformObjectId } from "../../util/helpers"

const Order: NextPage<{ order: Order }> = ({ order }) => {
  const [orderState, setOrderState] = useState(order)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const orderId = router.query.orderId

  const cancelOrder = async () => {
    setLoading(true)
    await fetch(`/api/orders/${orderId}`, { method: "PUT" })
    const result = await fetch(`/api/orders/${orderId}`)
    const [data] = await result.json()
    setOrderState(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Bestellung bearbeiten</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div
          className={`bg-white rounded-xl p-3 my-3 shadow-lg ${
            orderState.cancelled ? "bg-violet-200" : ""
          }`}
        >
          <div className="flex justify-center">
            {orderState.cancelled && (
              <div className="text-xl text-red-600 font-bold">Storniert</div>
            )}
          </div>
          <div className="flex justify-between font-medium">
            <div>Bestellungs ID:&nbsp;</div>
            <div>{orderState._id}</div>
          </div>
          <div className="flex justify-between">
            <div>Bücher:&nbsp;</div>
            <div>
              {orderState.books.map((book, index) => {
                return <div key={index}>{`${book.amount}x ${book.bookId}`}</div>
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div>Kunden ID:&nbsp;</div>
            <div>{orderState.customerId}</div>
          </div>
          <div className="flex justify-between">
            <div>Gesamtpreis:&nbsp;</div>
            <div>{orderState.totalPrice}€</div>
          </div>
          {!orderState.cancelled && (
            <div className="flex justify-end">
              <button
                className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
                  loading ? "bg-violet-500 pointer-events-none" : ""
                }`}
                disabled={loading}
                onClick={cancelOrder}
              >
                {loading ? (
                  <ImSpinner className="animate-spin text-2xl mx-6" />
                ) : (
                  "Stornieren"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = await connectDb()

  const [orderResult] = await getOrderById(client, params?.orderId as string)
  const order = tranformObjectId(orderResult)

  client.close()
  return {
    props: { order },
    revalidate: 60
  }
}

export const getStaticPaths = async () => {
  const client = await connectDb()

  const ordersResult = await getOrders(client)
  let orders = []
  if (ordersResult) {
    orders = ordersResult.map((orderResult) => tranformObjectId(orderResult))
  }

  client.close()
  return {
    paths: orders.map((order) => {
      return { params: { orderId: order._id } }
    }),
    fallback: false
  }
}

export default Order
