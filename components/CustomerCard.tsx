import type { Customer } from "../types"
import Link from "next/link"

const CustomerCard = ({ customer }: { customer: Customer | any }) => {
  return (
    <div
      className={`bg-white rounded-xl p-3 my-3 shadow-lg ${
        customer.subscribed ? "" : "bg-violet-200"
      }`}
    >
      <div className="flex justify-center">
        {!customer.subscribed && (
          <div className="text-xl text-red-600 font-bold">Gekündigt</div>
        )}
      </div>
      <div className="flex justify-between font-medium">
        <div>Kunden ID:&nbsp;</div>
        <div>{customer._id}</div>
      </div>
      <div className="flex justify-between">
        <div>Vorname:&nbsp;</div>
        <div>{customer.firstName}</div>
      </div>
      <div className="flex justify-between">
        <div>Nachname:&nbsp;</div>
        <div>{customer.lastName}</div>
      </div>
      <div className="flex justify-between">
        <div>Bestellungen:&nbsp;</div>
        <div>
          {customer.orders.length === 0 ? (
            <div>Keine Bestellungen</div>
          ) : (
            customer.orders.map((order: any) => {
              return <div key={order}>{order}</div>
            })
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Link href={`/kunden/${customer._id}`}>
          <button
            className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
              customer.subscribed ? "" : "bg-violet-500"
            }`}
          >
            Bearbeiten
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CustomerCard
