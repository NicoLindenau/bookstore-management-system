import type { NextPage, GetStaticProps } from "next"
import type { Customer } from "../../types"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ImSpinner } from "react-icons/im"
import connectDb from "../../util/connectDb"
import { getCustomerById, getCustomers } from "../../util/getData"
import { tranformObjectId } from "../../util/helpers"

const Customer: NextPage<{ customer: Customer }> = ({ customer }) => {
  const [customerState, setCustomerState] = useState(customer)
  const [firstName, setFirstName] = useState(customer.firstName)
  const [lastName, setLastName] = useState(customer.lastName)
  const [loading, setLoading] = useState(false)
  const [loadingSubscribed, setLoadingSubscribed] = useState(false)
  const router = useRouter()
  const customerId = router.query.customerId

  const updateCustomer = async () => {
    setLoading(true)
    const body = { firstName, lastName }
    await fetch(`/api/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
    const result = await fetch(`/api/customers/${customerId}`)
    const [data] = await result.json()
    setCustomerState(data)
    setLoading(false)
  }

  const unsubscribeCustomer = async () => {
    setLoadingSubscribed(true)
    await fetch(`/api/customers/${customerId}`, {
      method: "PATCH"
    })
    const result = await fetch(`/api/customers/${customerId}`)
    const [data] = await result.json()
    setCustomerState(data)
    setLoadingSubscribed(false)
  }

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Kunde bearbeiten</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div
          className={`bg-white rounded-xl p-3 my-3 shadow-lg ${
            customerState.subscribed ? "" : "bg-violet-200"
          }`}
        >
          <div className="flex justify-center">
            {!customerState.subscribed && (
              <div className="text-xl text-red-600 font-bold">Gekündigt</div>
            )}
          </div>
          <div className="flex justify-between font-medium">
            <div>Kunden ID:&nbsp;</div>
            <div>{customerState._id}</div>
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="customer-first-name">Vorname:&nbsp;</label>
            <input
              id="customer-first-name"
              className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
              type="text"
              value={firstName}
              placeholder={customerState.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="customer-last-name">Nachname:&nbsp;</label>
            <input
              id="customer-last-name"
              className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
              type="text"
              value={lastName}
              placeholder={customerState.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            {customerState.subscribed ? (
              <button
                className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
                  loadingSubscribed ? "bg-violet-500 pointer-events-none" : ""
                }`}
                onClick={unsubscribeCustomer}
              >
                {loadingSubscribed ? (
                  <ImSpinner className="animate-spin text-2xl mx-5" />
                ) : (
                  "Kündigen"
                )}
              </button>
            ) : (
              <div></div>
            )}

            <button
              className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
                loading ? "bg-violet-500 pointer-events-none" : ""
              } ${customerState.subscribed ? "" : "bg-violet-500"}`}
              disabled={loading}
              onClick={updateCustomer}
            >
              {loading ? (
                <ImSpinner className="animate-spin text-2xl mx-8" />
              ) : (
                "Aktualisieren"
              )}
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = await connectDb()

  const [customerResult] = await getCustomerById(
    client,
    params?.customerId as string
  )
  const customer = tranformObjectId(customerResult)

  client.close()
  return {
    props: { customer },
    revalidate: 60
  }
}

export const getStaticPaths = async () => {
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
    paths: customers.map((customer) => {
      return { params: { customerId: customer._id } }
    }),
    fallback: false
  }
}

export default Customer
