import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ImSpinner } from "react-icons/im"

const New: NextPage = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const createBook = async () => {
    setLoading(true)
    const body = { title, author, amount: Number(amount), price: Number(price) }
    await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
    setLoading(false)
    router.push("/buecher")
  }

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Neues Buch</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div>
          <div className="text-xl font-bold">Neues Buch erstellen:</div>
          <div className="bg-white rounded-xl p-3 my-3 shadow-lg">
            <div className="flex justify-between items-center my-2">
              <label htmlFor="book-title">Titel:&nbsp;</label>
              <input
                id="book-title"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                value={title}
                placeholder={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center my-2">
              <label htmlFor="book-author">Autor:&nbsp;</label>
              <input
                id="book-author"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="text"
                value={author}
                placeholder={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center my-2">
              <label htmlFor="book-stock">Menge:&nbsp;</label>
              <input
                id="book-stock"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="number"
                value={amount}
                placeholder={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center my-2">
              <label htmlFor="book-price">Preis in €:&nbsp;</label>
              <input
                id="book-price"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="number"
                value={price}
                placeholder={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
                  loading ? "bg-violet-500 pointer-events-none" : ""
                }`}
                disabled={loading}
                onClick={createBook}
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
