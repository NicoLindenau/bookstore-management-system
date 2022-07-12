import type { NextPage, GetStaticProps } from "next"
import type { Order } from "../../types"
import Head from "next/head"
import { useEffect, useState } from "react"
import connectDb from "../../util/connectDb"
import { getOrders } from "../../util/getData"
import { tranformObjectId } from "../../util/helpers"
import CreateButton from "../../components/CreateButton"
import OrderCard from "../../components/OrderCard"

const Orders: NextPage<{
  orders: Order[]
}> = ({ orders }) => {
  const [ordersState, setOrdersState] = useState(orders)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/orders")
      const data = await result.json()
      setOrdersState(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Bestellungen</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">Alle Bestellungen</div>
            <CreateButton path="/bestellungen/neu" />
          </div>
          {ordersState.length > 0 ? (
            ordersState.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <div className="bg-white rounded-xl p-3 my-3 shadow-lg font-medium">
              Bis jetzt noch keine Bestellungen.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = await connectDb()

  const ordersResult = await getOrders(client)

  let orders = []
  if (ordersResult) {
    orders = ordersResult.map((orderResult) => tranformObjectId(orderResult))
  }

  client.close()
  return {
    props: { orders },
    revalidate: 60
  }
}

export default Orders
