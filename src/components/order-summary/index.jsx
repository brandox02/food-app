import { Collapse, Textarea } from "@mantine/core"
import { useState } from "react";
import { useActions } from "./useActions"



export function OrderSummary({ order, setOrder }) {

  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);

  const { setComment, dailyDishDetails, dailyDishPrice, incrementOrDecrementDetailQuantity, orderTypeId, restDetails, totalOrder } = useActions({ order, setOrder });
  const dailyDishJsx = orderTypeId === 1 && <>
    <div>
      <div className="w-full text-sm text-gray-500">
        <span>Plato del dia RD$ {dailyDishPrice}</span>
      </div>
      {dailyDishDetails.map((item, index) => (
        <>
          <div className="flex" key={index}>
            <div className=" w-[90%]">
              <div className="flex  justify-between items-end border-b pb-2 px-2 sm:px-6 xl:px-12">
                <div className="flex flex-col">

                  <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
                    <span key={index}>{item.name}</span>
                  </div>
                </div>
                <div>
                </div>
              </div>
              <div className="">
                <Collapse in={opened}>
                  <Textarea maxLength={200} size="xs" value={item.comment} onChange={(evt) => setComment({ value: evt.currentTarget.value, id: item.id })} />
                </Collapse>
              </div>
            </div>
            <div className="w-[10%] self-center pl-1">
              <button
                onClick={() => setOpened((o) => !o)}
                className="underline italic underline-offset-2 text-blue-400 hover:text-blue-300 text-xs"
              >
                {opened ? 'Descartar nota' : 'Agregar nota'}
              </button>
            </div>
          </div></>
      ))}

    </div>
  </>

  const thereAreExtra = restDetails.length > 0;

  return <> <div className="flex flex-col w-full font-[poppins]" key={order.id}>
    <span className="text-2xl text-[#1A579A] font-semibold italic pl-2">
      Resumen
    </span>
    <div className="h-[3px] w-full bg-orange-400 self-start rounded-full"></div>
  </div>

    <div className="flex flex-col">

      {dailyDishJsx}

      {orderTypeId === 1 && thereAreExtra && <>
        <div className="flex flex-col w-[90%] border-b py-2 px-2 sm:px-6 xl:px-12">
          <div className="w-full text-sm text-gray-500">
            <span>Extras</span>
          </div>
        </div>

        <div className="flex flex-col w-[90%] bg-blue-100 border-b py-1 italic font-semibold text-blue-900 px-3 sm:px-8 xl:px-14">
          <div className="flex justify-between">
            <div className="flex gap-9 md:gap-0 truncate">
              <span className="md:max-w-[90px] md:min-w-[90px]">Cant.</span>
              <span className="truncate">Producto</span>
            </div>
            <div>Precio</div>
            <div>Total</div>
          </div>
        </div>
      </>}

      {restDetails.map((item, index) => (
        <>
          <div className="w-full flex" key={index}>
            <div className="w-[90%]">
              <div className="flex flex-col border-b py-2 px-2 sm:px-6 xl:px-12">
                <div className="flex justify-between">
                  <div className="flex  gap-5 md:gap-10 truncate">
                    <div className="flex items-center font-semibold gap-2">
                      <button className="px-0.5" onClick={() => item.quantity > 0 && incrementOrDecrementDetailQuantity({ id: item.id, quantity: -1 })}>
                        -
                      </button>
                      <span className="min-w-[16px] max-w-[16px] flex justify-center">
                        {item.quantity}
                      </span>
                      <button className="px-0.5" onClick={() => item.quantity > -1 && incrementOrDecrementDetailQuantity({ id: item.id })}>
                        +
                      </button>
                    </div>
                    <span className="truncate pr-2 self-center text-xs sm:text-sm md:text-base">
                      {item.name}
                    </span>
                  </div>
                  <div className="italic text-blue-900 font-semibold">
                    RD${item.price}
                  </div>
                  <div className="italic text-blue-900 font-semibold">
                    RD${item.total}
                  </div>
                </div>
              </div>
              <div>
                <Collapse in={opened2}>
                  <Textarea maxLength={200} value={item.comment} size="xs" onChange={(evt) => setComment({ value: evt.currentTarget.value, id: item.id })} />
                </Collapse>
              </div>
            </div>
            <div className="w-[10%] self-center pl-1">
              <button
                onClick={() => setOpened2((o) => !o)}
                className="underline italic underline-offset-2 text-blue-400 hover:text-blue-300 text-xs"
              >
                {opened2 ? 'Descartar nota' : 'Agregar nota'}
              </button>
            </div>
          </div>
        </>
      ))}
    </div>

    <div className="italic text-xl font-semibold">
      Total de Orden: RD${totalOrder}
    </div></>
}