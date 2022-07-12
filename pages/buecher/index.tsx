import type { NextPage, GetStaticProps } from "next"
import type { Book } from "../../types"
import Head from "next/head"
import { useEffect, useState } from "react"
import connectDb from "../../util/connectDb"
import { getBooks } from "../../util/getData"
import { tranformObjectId } from "../../util/helpers"
import CreateButton from "../../components/CreateButton"
import BookCard from "../../components/BookCard"

const Books: NextPage<{
  books: Book[]
}> = ({ books }) => {
  const [booksState, setBooksState] = useState(books)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/books")
      const data = await result.json()
      setBooksState(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Bücher</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">Alle Bücher</div>
            <CreateButton path="/buecher/neu" />
          </div>

          {booksState.length > 0 ? (
            booksState.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <div className="bg-white rounded-xl p-3 my-3 shadow-lg font-medium">
              Bis jetzt noch keine Bücher.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = await connectDb()

  const booksResult = await getBooks(client)

  let books = []
  if (booksResult) {
    books = booksResult.map((bookResult) => tranformObjectId(bookResult))
  }

  client.close()
  return {
    props: { books },
    revalidate: 60
  }
}

export default Books
