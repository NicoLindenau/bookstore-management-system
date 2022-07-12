import type { NextPage, GetStaticProps } from "next"
import type { Customer } from "../../types"
import Head from "next/head"
import { useEffect, useState } from "react"
import connectDb from "../../util/connectDb"
import { getCustomers } from "../../util/getData"
import { tranformObjectId } from "../../util/helpers"
import CreateButton from "../../components/CreateButton"
import CustomerCard from "../../components/CustomerCard"

const Customers: NextPage<{
  customers: Customer[]
}> = ({ customers }) => {
  const [customersState, setCustomersState] = useState(customers)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/customers")
      const data = await result.json()
      setCustomersState(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Kunden</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">Alle Kunden</div>
            <CreateButton path="/kunden/neu" />
          </div>
          {customersState.length > 0 ? (
            customersState.map((customer) => (
              <CustomerCard key={customer._id} customer={customer} />
            ))
          ) : (
            <div className="bg-white rounded-xl p-3 my-3 shadow-lg font-medium">
              Bis jetzt noch keine Kunden.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = await connectDb()

  const customersResult = await getCustomers(client)

  let customers = []
  if (customersResult) {
    customers = customersResult.map((customerResult) =>
      tranformObjectId(customerResult)
    )
  }

  client.close()
  return {
    props: { customers },
    revalidate: 60
  }
}

export default Customers
