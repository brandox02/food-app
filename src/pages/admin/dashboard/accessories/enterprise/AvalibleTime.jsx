import { CountDown } from "../admin/CountDown"

export const AvalibleTime = () => {

   return (
      <div className="lg:w-full w-full max-w-[400px] mx-auto rounded-lg shadow-md flex flex-col justify-around font-[poppins] items-center px-3 lg:px-10 min-h-[350px] py-6 gap-6 text-center bg-white">
         <span className="text-black italic font-semibold text-4xl">
            <CountDown />
         </span>
         <span className="text-gray-400 italic">Opciones rápidas:</span>
         <div className="flex gap-4">
            <button className="bg-[#6BDB00] hover:bg-green-400 rounded-lg px-2 py-1 text-sm text-white italic">
               Aumentar +1h
            </button>
            <button className="bg-red-600 hover:bg-red-400 rounded-lg px-4 py-1 text-sm text-white italic">
               Detener
            </button>
         </div>
      </div>
   )
}