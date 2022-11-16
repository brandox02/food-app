import React from 'react';
import { RiCoinsLine, RiStarFill } from 'react-icons/ri';
import { GiSandsOfTime } from 'react-icons/gi';
import { useAppContext } from '../../../AppProvider'
import CounterDown from 'react-countdown'
import dayjs from 'dayjs';
export const MainGrid = ({ orderTotal = '245', accMount = 0 }) => {

  const [{ generalParameters }] = useAppContext();
  const hourLimit = parseInt(generalParameters.find(item => item.id === 2)?.value || 0);

  const countDownDate = dayjs().set('hours', hourLimit).set('minutes', 0).set('seconds', 0).set('millisecond', 0).valueOf();
  function generateSeq(size, count) {
    const breakpoint = size - count.toString().length;
    const result =
      [...Array(breakpoint)].map(() => '0').join('') + count.toString();
    return result;
  }


  return (
    <div className="w-full flex mb-8">
      <div className="w-full max-w-[1750px] mx-auto px-5 lg:px-24 grid lg:grid-cols-3 grid-cols-1 gap-5 gap-y-6 xl:gap-12">
        <div className="lg:w-full w-full max-w-[400px] mx-auto rounded-lg shadow-md flex flex-col justify-center font-[poppins] items-center px-3 xl:px-10 min-h-[350px] py-6 gap-6 text-center bg-white">
          <span className="text-blue-900 italic text-xl md:text-2xl px-3 xl:px-5">
            Monto Acumulado Octubre 2022
          </span>
          <RiCoinsLine className="text-blue-500 w-20 h-20" />
          <span className="text-blue-900 italic font-semibold text-4xl">
            RD$ {accMount}
          </span>
        </div>

        <div className="lg:w-full w-full max-w-[400px] mx-auto flex flex-col rounded-lg gap-6 shadow-md bg-white min-h-[350px] font-[poppins]">
          <div className="flex flex-col px-4 py-2">
            <div className="w-full  flex justify-end">
              <RiStarFill className="text-yellow-400 h-8 w-8" />
            </div>
            <div className=" w-fit self-center">
              <span className="text-blue-900 text-xl italic">
                Orden más frecuente
              </span>
              <div className="h-[3px] w-32 bg-yellow-400 self-start rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col px-6 xl:px-12">
            <div className="w-full text-sm text-gray-500 flex justify-between">
              <span>Plato del dia</span>
              <span className="italic font-semibold">RD$ 150</span>
            </div>
            <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
              <span>x Arroz blanco</span>
              <span>x Pollo guisado</span>
              <span>x Ensalada Rusa</span>
            </div>
          </div>
          <div className="flex flex-col px-6 xl:px-12">
            <div className="w-full text-sm text-gray-500">
              <span>Extras</span>
            </div>
            <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
              <div className="flex justify-between">
                <span>x Aguacate</span>
                <span className="italic font-semibold">RD$ 50</span>
              </div>
              <div className="flex justify-between">
                <span>x Jugo Chinola 20Oz</span>
                <span className="italic font-semibold">RD$ 45</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 py-2 flex justify-end gap-6 px-10">
            <span className="font-semibold italic">Total:</span>
            <span className="font-semibold italic">RD${orderTotal}</span>
          </div>
          <div className="flex justify-center pb-6 text-sm italic">
            <button className="italic underline font-semibold hover:text-blue-300 underline-offset-2 text-blue-400">
              Pedir esta orden de nuevo
            </button>
          </div>
        </div>

        <div className="lg:w-full w-full max-w-[400px] mx-auto rounded-lg shadow-md flex flex-col justify-center font-[poppins] items-center px-3 lg:px-10 min-h-[350px] py-6 gap-6 text-center bg-white">
          <span className="text-blue-900 italic text-xl md:text-2xl px-3 ">
            Tiempo disponible para ordenar
          </span>
          <GiSandsOfTime className="text-blue-500 w-20 h-20" />
          <span className="text-blue-900 italic font-semibold text-4xl">
            <CounterDown date={countDownDate} renderer={({ hours, minutes, seconds }) => <>{`${generateSeq(2, hours)}:${generateSeq(2, minutes)}:${generateSeq(2, seconds)}`}</>} />
          </span>
        </div>
      </div>
    </div>
  );
};
