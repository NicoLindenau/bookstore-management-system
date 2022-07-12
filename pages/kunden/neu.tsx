import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ImSpinner } from "react-icons/im"

const New: NextPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const createCustomer = async () => {
    setLoading(true)
    const body = { firstName, lastName }
    await fetch("http://localhost:3000/api/customers", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
    setLoading(false)
    router.push("/kunden")
  }

  return (
    <>
      <Head>
        <title>Deine Buchverwaltung - Neuer Kunde</title>
      </Head>
      <div className="flex justify-center pt-10 bg-violet-100">
        <div>
          <div className="text-xl font-bold">Neuer Kunde</div>
          <div className="bg-white rounded-xl p-3 my-3 shadow-lg">
            <div className="flex justify-between items-center my-2">
              <label htmlFor="customer-first-name">Vorname:&nbsp;</label>
              <input
                id="customer-first-name"
                className="bg-violet-100 border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                type="text"
                value={firstName}
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
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className={`bg-violet-600 text-white hover:scale-110 transition py-1 px-3 mt-1 rounded-full ${
                  loading ? "bg-violet-500 pointer-events-none" : ""
                }`}
                disabled={loading}
                onClick={createCustomer}
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
