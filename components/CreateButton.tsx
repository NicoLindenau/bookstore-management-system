import Link from "next/link"
import { AiOutlinePlusCircle } from "react-icons/ai"

const CreateButton = ({ path }: { path: string }) => {
  return (
    <Link href={path}>
      <button>
        <AiOutlinePlusCircle className="text-3xl text-violet-600 hover:scale-125 transition" />
      </button>
    </Link>
  )
}

export default CreateButton
