import type { Book } from "../types"
import Link from "next/link"

const BookCard = ({ book }: { book: Book | any }) => {
  return (
    <div className="bg-white rounded-xl p-3 my-3 shadow-lg">
      <div className="flex justify-between font-medium">
        <div>Buch ID:&nbsp;</div>
        <div>{book._id}</div>
      </div>
      <div className="flex justify-between">
        <div>Titel:&nbsp;</div>
        <div>{book.title}</div>
      </div>
      <div className="flex justify-between">
        <div>Autor:&nbsp;</div>
        <div>{book.author}</div>
      </div>
      <div className="flex justify-between">
        <div>Menge:&nbsp;</div>
        <div className={`${book.amount < 1 ? "text-red-500 font-bold" : ""}`}>
          {book.amount}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Preis:&nbsp;</div>
        <div>{book.price}€</div>
      </div>
      <div className="flex justify-end">
        <Link href={`/buecher/${book._id}`}>
          <button className="bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full">
            Bearbeiten
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BookCard
