import Link from "next/link"
import { useRouter } from "next/router"
import { BsBook } from "react-icons/bs"

const Navbar = () => {
  const { asPath } = useRouter()

  return (
    <div className="flex items-stretch justify-around bg-violet-600 p-2">
      <Link href="/">
        <div className="cursor-pointer flex items-center mx-1 px-1">
          <BsBook className="text-4xl text-violet-200 hover:text-white" />
        </div>
      </Link>
      <div className="flex">
        <Link href="/">
          <div className="cursor-pointer text-violet-200 hover:text-white flex items-center mx-1 px-5 font-bold">
            <div className={asPath === "/" ? "text-white" : ""}>
              Neueste Einträge
            </div>
          </div>
        </Link>
        <Link href="/buecher">
          <div className="cursor-pointer text-violet-200 hover:text-white flex items-center mx-1 px-5 font-bold">
            <div className={asPath === "/buecher" ? "text-white" : ""}>
              Bücher
            </div>
          </div>
        </Link>
        <Link href="/kunden">
          <div className="cursor-pointer text-violet-200 hover:text-white flex items-center mx-1 px-5 font-bold">
            <div className={asPath === "/kunden" ? "text-white" : ""}>
              Kunden
            </div>
          </div>
        </Link>
        <Link href="/bestellungen">
          <div className="cursor-pointer text-violet-200 hover:text-white flex items-center mx-1 px-5 font-bold">
            <div className={asPath === "/bestellungen" ? "text-white" : ""}>
              Bestellungen
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
