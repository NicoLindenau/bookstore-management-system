import type { NextPage, GetStaticProps } from "next"
import type { Book } from "../../types"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ImSpinner } from "react-icons/im"
import connectDb from "../../util/connectDb"
import { getBookById, getBooks } from "../../util/getData"
import { tranformObjectId } from "../../util/helpers"

const Book: NextPage<{ book: Book }> = ({ book }) => {
  const [bookState, setBookState] = useState(book)
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const [amount, setAmount] = useState(book.amount.toString())
  const [price, setPrice] = useState(book.price.toString())
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const bookId = router.query.bookId

  const updateBook = async () => {
    setLoading(true)
    const body = { title, author, amount: Number(amount), price: Number(price) }
    await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
    const result = await fetch(`/api/books/${bookId}`)
    const [data] = await result.json()
    setBookState(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Buch bearbeiten</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div className="bg-white rounded-xl p-3 my-3 shadow-lg">
          <div className="flex justify-between font-medium">
            <div>Buch ID:&nbsp;</div>
            <div>{bookState._id}</div>
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="book-title">Titel:&nbsp;</label>
            <input
              id="book-title"
              className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
              value={title}
              placeholder={bookState.title}
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
              placeholder={bookState.author}
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
              placeholder={String(bookState.amount)}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="book-price">Preis:&nbsp;</label>
            <input
              id="book-price"
              className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
              type="number"
              value={price}
              placeholder={String(bookState.price)}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
                loading ? "bg-violet-500 pointer-events-none" : ""
              }`}
              disabled={loading}
              onClick={updateBook}
            >
              {loading ? (
                <ImSpinner className="animate-spin text-2xl mx-8" />
              ) : (
                "Aktualisieren"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = await connectDb()

  const [bookResult] = await getBookById(client, params?.bookId as string)
  const book = tranformObjectId(bookResult)

  client.close()
  return {
    props: { book },
    revalidate: 60
  }
}

export const getStaticPaths = async () => {
  const client = await connectDb()

  const booksResult = await getBooks(client)
  let books = []
  if (booksResult) {
    books = booksResult.map((bookResult) => tranformObjectId(bookResult))
  }

  client.close()
  return {
    paths: books.map((book) => {
      return { params: { bookId: book._id } }
    }),
    fallback: false
  }
}

export default Book
