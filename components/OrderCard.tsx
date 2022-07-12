import type { Order, OrderedBook } from "../types"
import Link from "next/link"

const OrderCard = ({ order }: { order: Order | any }) => {
  return (
    <div
      className={`bg-white rounded-xl p-3 my-3 shadow-lg ${
        order.cancelled ? "bg-violet-200" : ""
      }`}
    >
      <div className="flex justify-center">
        {order.cancelled && (
          <div className="text-xl text-red-600 font-bold">Storniert</div>
        )}
      </div>
      <div className="flex justify-between font-medium">
        <div>Bestellungs ID:&nbsp;</div>
        <div>{order._id}</div>
      </div>
      <div className="flex justify-between">
        <div>Bücher:&nbsp;</div>
        <div>
          {order.books.map((book: OrderedBook, index: number) => {
            return <div key={index}>{`${book.amount}x ${book.bookId}`}</div>
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Kunden ID:&nbsp;</div>
        <div>{order.customerId}</div>
      </div>
      <div className="flex justify-between">
        <div>Gesamtpreis:&nbsp;</div>
        <div>{order.totalPrice}€</div>
      </div>
      {!order.cancelled && (
        <div className="flex justify-end">
          <Link href={`/bestellungen/${order._id}`}>
            <button className="bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full">
              Bearbeiten
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default OrderCard
