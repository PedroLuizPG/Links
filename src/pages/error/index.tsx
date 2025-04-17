import { Link } from "react-router";
import {BiHome} from 'react-icons/bi'

export function Error(){
    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen  ">
            <h1 className="text-white font-bold text-5xl mb-4">Pagina não encontrada</h1>
            <p className="text-white text-4xl">404 - not found</p>

            <Link to={'/'} className="text-white border border-b-blue-700 border-l-purple-700 border-t-purple-600 border-r-blue-800 rounded mt-5 p-2 hover:text-gray-950 hover:bg-gradient-to-r from-indigo-400 to-orange-400 font-medium flex items-center justify-center gap-2 transition-all duration-[800ms] ease-in-out">Voltar para Home <BiHome size={20}/></Link>
        </div>
    )
}