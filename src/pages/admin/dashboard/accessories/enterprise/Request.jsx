export const Request = ({ total }) => {

   return (
      <div className="lg:w-full w-full max-w-[400px] mx-auto rounded-lg shadow-md flex flex-col justify-around font-[poppins] items-center px-3 xl:px-10 min-h-[350px] py-6 gap-8 text-center bg-white">
         <span className="text-blue-900 italic text-xl md:text-2xl px-3 xl:px-5">
            Solicitudes
         </span>
         <div className="bg-blue-500 text-7xl italic text-white p-7 rounded-full">
            {total}
         </div>
         {/* <Link
            className="text-lg underline underline-offset-2 italic text-blue-500"
            href="/admin/empleados/requests"
         >
            Ver todas
         </Link> */}
      </div>
   )
}