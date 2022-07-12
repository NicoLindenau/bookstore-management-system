import type { NextPage, GetStaticProps } from "next"
import type { Book, Customer, Order } from "../types"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoMdArrowRoundForward } from "react-icons/io"
import connectDb from "../util/connectDb"
import { getLatestData } from "../util/getData"
import { tranformObjectId } from "../util/helpers"
import BookCard from "../components/BookCard"
import CustomerCard from "../components/CustomerCard"
import OrderCard from "../components/OrderCard"
import CreateButton from "../components/CreateButton"

const Home: NextPage<{
  latestBook: Book
  latestCustomer: Customer
  latestOrder: Order
}> = ({ latestBook, latestCustomer, latestOrder }) => {
  const [latestBooksState, setLatestBooksState] = useState<Book | {}>(
    latestBook
  )
  const [latestCustomerState, setLatestCustomerState] = useState<Customer | {}>(
    latestCustomer
  )
  const [latestOrderState, setLatestOrderState] = useState<Order | {}>(
    latestOrder
  )

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/latest")
      const [[latestBookResult], [latestCustomerResult], [latestOrderResult]] =
        await result.json()
      let latestBook = {}
      let latestCustomer = {}
      let latestOrder = {}
      if (latestBookResult) {
        latestBook = tranformObjectId(latestBookResult)
      }
      if (latestCustomerResult) {
        latestCustomer = tranformObjectId(latestCustomerResult)
      }
      if (latestOrderResult) {
        latestOrder = tranformObjectId(latestOrderResult)
      }
      setLatestBooksState(latestBook)
      setLatestCustomerState(latestCustomer)
      setLatestOrderState(latestOrder)
    }
    fetchData()
  }, [])
  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Übersicht</title>
      </Head>
      <div className="flex justify-around pt-10 bg-violet-100">
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">Neuestes Buch</div>
            <CreateButton path="/buecher/neu" />
          </div>
          {Object.keys(latestBooksState).length !== 0 ? (
            <BookCard book={latestBooksState} />
          ) : (
            <div className="bg-white rounded-xl p-3 my-3 shadow-lg font-medium">
              Bis jetzt noch keine Bücher.
            </div>
          )}
          <div className="flex justify-center">
            <Link href="/buecher">
              <button className="bg-violet-600 text-white hover:scale-110 transition py-2 px-4 rounded-full">
                Zu allen Büchern <IoMdArrowRoundForward className="inline" />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">Neuester Kunde</div>
            <CreateButton path="/kunden/neu" />
          </div>
          {Object.keys(latestCustomerState).length !== 0 ? (
            <CustomerCard customer={latestCustomerState} />
          ) : (
            <div className="bg-white rounded-xl p-3 my-3 shadow-lg font-medium">
              Bis jetzt noch keine Kunden.
            </div>
          )}
          <div className="flex justify-center">
            <Link href="/kunden">
              <button className="bg-violet-600 text-white hover:scale-110 transition py-2 px-4 rounded-full">
                Zu allen Kunden <IoMdArrowRoundForward className="inline" />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">Neueste Bestellung</div>
            <CreateButton path="/bestellungen/neu" />
          </div>
          {Object.keys(latestOrderState).length !== 0 ? (
            <OrderCard order={latestOrderState} />
          ) : (
            <div className="bg-white rounded-xl p-3 my-3 shadow-lg font-medium">
              Bis jetzt noch keine Bestellungen.
            </div>
          )}
          <div className="flex justify-center">
            <Link href="/bestellungen">
              <button className="bg-violet-600 text-white hover:scale-110 transition py-2 px-4 rounded-full">
                Zu allen Bestellungen
                <IoMdArrowRoundForward className="inline" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = await connectDb()

  const [[latestBookResult], [latestCustomerResult], [latestOrderResult]] =
    await getLatestData(client)

  let latestBook = {}
  let latestCustomer = {}
  let latestOrder = {}
  if (latestBookResult) {
    latestBook = tranformObjectId(latestBookResult)
  }
  if (latestCustomerResult) {
    latestCustomer = tranformObjectId(latestCustomerResult)
  }
  if (latestOrderResult) {
    latestOrder = tranformObjectId(latestOrderResult)
  }

  client.close()
  return {
    props: { latestBook, latestCustomer, latestOrder },
    revalidate: 60
  }
}

export default Home
