import { GiSandsOfTime } from "react-icons/gi"
import CounterDown from 'react-countdown';
import { useAppContext } from "../../../../../AppProvider";
import dayjs from 'dayjs';

export const CountDown = () => {
   const [{ generalParameters }] = useAppContext();

   const hourLimit = parseInt(
      generalParameters.find((item) => item.id === 2)?.value || 0
   );
   const countDownDate = dayjs()
      .set('hours', hourLimit)
      .set('minutes', 0)
      .set('seconds', 0)
      .set('millisecond', 0)
      .valueOf();

   function generateSeq(size, count) {
      const breakpoint = size - count.toString().length;
      const result =
         [...Array(breakpoint)].map(() => '0').join('') + count.toString();
      return result;
   }
   return (
      <div className="lg:w-full w-full max-w-[400px] mx-auto rounded-lg shadow-md flex flex-col justify-around font-[poppins] items-center px-3 lg:px-10 min-h-[350px] py-6 gap-6 text-center bg-white">
         <span className="text-blue-900 italic text-xl md:text-2xl px-3 ">
            Tiempo disponible
         </span>
         <GiSandsOfTime className="text-blue-500" size={130} />
         <span className="text-blue-900 italic font-semibold text-4xl">
            <CounterDown
               date={countDownDate}
               renderer={({ hours, minutes, seconds }) => (
                  <>{`${generateSeq(2, hours)}:${generateSeq(
                     2,
                     minutes
                  )}:${generateSeq(2, seconds)}`}</>
               )}
            />
         </span>
      </div>
   )
}