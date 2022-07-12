import type { NextPage } from "next"
import type { OrderedBook } from "../../types"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ImSpinner, ImCancelCircle } from "react-icons/im"
import { BiBookAdd } from "react-icons/bi"

const New: NextPage = () => {
  const [books, setBooks] = useState<OrderedBook[]>([])
  const [bookId, setBookId] = useState("")
  const [amount, setAmount] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [totalPrice, setTotalPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const createOrder = async () => {
    setLoading(true)
    const body = { books, customerId, totalPrice: Number(totalPrice) }
    await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
    setLoading(false)
    router.push("/bestellungen")
  }

  const addBook = () => {
    setBooks((prev) => [...prev, { bookId, amount: Number(amount) }])
    setBookId("")
    setAmount("")
  }

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.bookId !== id))
  }

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Neue Bestellung</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div>
          <div className="text-xl font-bold">Neue Bestellung</div>
          <div className="bg-white rounded-xl p-3 my-3 shadow-lg">
            <div className="flex justify-between items-center my-2">
              <label htmlFor="order-book-id">Buch ID:&nbsp;</label>
              <input
                id="order-book-id"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center my-2">
              <label htmlFor="order-amount">Menge:&nbsp;</label>
              <input
                id="order-amount"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full"
                onClick={addBook}
              >
                <BiBookAdd className="text-xl" />
              </button>
            </div>
            {books.map((book, index) => (
              <div key={index} className="flex justify-end my-1">
                <div>{`${book.amount}x ${book.bookId}`}&nbsp;</div>
                <button
                  className="text-violet-500"
                  onClick={() => deleteBook(book.bookId)}
                >
                  <ImCancelCircle />
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center my-2">
              <label htmlFor="order-customer-id">Kunden ID:&nbsp;</label>
              <input
                id="order-customer-id"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center my-2">
              <label htmlFor="order-total-price">Gesamtsumme in €:&nbsp;</label>
              <input
                id="order-total-price"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="number"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
                  loading ? "bg-violet-500 pointer-events-none" : ""
                }`}
                disabled={loading}
                onClick={createOrder}
              >
                {loading ? (
                  <ImSpinner className="animate-spin text-2xl mx-6" />
                ) : (
                  "Speichern"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default New
