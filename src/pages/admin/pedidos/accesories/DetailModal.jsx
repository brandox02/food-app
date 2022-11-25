import { Modal } from "@mantine/core"
import dayjs from "dayjs"
import { AiOutlineCheck } from "react-icons/ai"


export const DetailModal = ({ open, setOpen, order, dailyDishPrice }) => {
   const extraItems = (order?.details || []).filter(item => item.price);
   const nonExtraItems = (order?.details || []).filter(item => !item.price);


   function getButtonColor() {

      switch (order.statusId) {
         case 2:
            return 'gray'
         case 3:
            return 'blue'
         case 4:
            return 'green'
         default:
            return 'gray'
      }
   }


   return (
      <Modal
         opened={open}
         onClose={() => setOpen(false)}
         title={
            <div className='bg-yellow-400 font-semibold pr-10 pl-3 '>No. Orden: {order?.noOrder}</div>
         }
         size={'xl'}
      >
         {order && (
            <>
               <div className="w-fit mb-5">
                  <span className="text-blue-900 text-xl font-semibold">
                     {'Detalles de Pedido'}
                  </span>
                  <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
               </div>

               <div>
                  <div className='bg-stone-100 flex flex-row p-2'>
                     <div className='w-2/4'>
                        <span className='text-blue-900 mr-2 font-semibold'>Nombre:</span>
                        <span>{`${order.user.firstname} ${order.user.lastname}`}</span>
                     </div>
                     <div className='w-2/4'>
                        <span className='text-blue-900 mr-2 font-semibold'>Departamento:</span>
                        <span>{order.user.department.name}</span>
                     </div>
                  </div>
                  <div className='bg-stone-100 flex flex-row p-2'>
                     <div className='w-2/4'>
                        <span className='text-blue-900 mr-2 font-semibold'>Correo:</span>
                        <span>{order.user.email}</span>
                     </div>
                     <div className='w-2/4'>
                        <span className='text-blue-900 mr-2 font-semibold'>Hora:</span>
                        <span>{dayjs(order.createdAt).format("hh:mmA")}</span>
                     </div>
                  </div>
               </div>
               <div className='px-10'>
                  <span className='text-lg my-5 flex justify-center font-bold'>Detalles de Orden</span>
                  {order.type.id === 1 && <>
                     <div className='flex justify-between'>
                        <span className='text-slate-600'>Plato del dia</span>
                        <span className='text-slate-600'>RD${dailyDishPrice}</span>
                     </div>
                     <div className='ml-7'>
                        {nonExtraItems.map(item => (
                           <div key={item.id} className='text-slate-600'>
                              {'X'} {item.name}
                           </div>
                        ))}
                     </div>
                  </>}
                  {extraItems.length ? (
                     <div className='flex justify-between mt-2'>
                        <span className='text-slate-600'>{order.type.id === 1 ? 'Extras' : 'Productos:'}</span>
                     </div>
                  ) : ''}
                  <div className='ml-7'>
                     {extraItems.map(item => (
                        <>
                           <div className='text-slate-600 flex justify-between'>
                              <span>X {item.name}</span>
                              <span>RD${item.total}</span>
                           </div>
                           <div className='text-xs w-3/4 text-blue-900 mb-3'>{item.comment}</div>
                        </>
                     ))}
                  </div>
               </div>
               <div className='bg-stone-100 flex justify-end px-10 py-1 mt-4'>Total: RD$${order.total}</div>
               <div className='flex justify-center mt-4'>
                  <span className='text-blue-900 font-bold' >{'Confirmación:'}</span>
                  <AiOutlineCheck color='#A8DBFF' size={20} className="mt-1 ml-3" />
               </div>
               <div className='flex justify-center items-center mt-1'>
                  <span className='text-blue-900 font-bold' >{'Estado:'}</span>
                  <div className={`bg-${getButtonColor()}-500 py-1.5 flex justify-center p-3 ml-2`}>
                     <span className="font-semibold text-white italic">{order.status.name}</span>
                  </div>
               </div>
            </>
         )}

      </Modal>
   )
}