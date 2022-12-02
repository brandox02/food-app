// import { Doughnut } from 'react-chartjs-2';
import {
   Chart as ChartJS,
   CategoryScale,
   ArcElement,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { gql, useQuery } from '@apollo/client';

ChartJS.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title
);

const TOTAL = gql`
   query MoneyAccumulatedMonthCompany{
      moneyAccumulatedMonthCompany
   }
`

export const AccumulateMonthAmount = () => {
   const { data } = useQuery(TOTAL, {
      fetchPolicy: 'cache-and-network'
   })
   // const dataDoughnut = {
   //    labels: ['Monto acumulado mes actual'],
   //    datasets: [
   //       {
   //          label: 'Monto acumulado mensual',
   //          data: [100, 25],
   //          backgroundColor: ['rgb(54, 162, 235)', 'rgb(54,0, 235)'],
   //          hoverOffset: 4,
   //       },
   //    ],
   // };
   const total = data?.moneyAccumulatedMonthCompany || 0;
   return (
      <div className="lg:w-full relative w-full max-w-[400px] mx-auto rounded-lg shadow-md flex flex-col justify-around font-[poppins] items-center px-3 xl:px-10 min-h-[350px] py-6 gap-3 text-center bg-white">
         <span className="text-blue-900 italic text-lg px-5">
            Monto acumulado en total Noviembre 2022
         </span>
         <div className="w-[70%]">
            {/* <Doughnut data={dataDoughnut} /> */}
         </div>
         <div className="text-4xl text-blue-500">RD${total}</div>
      </div>
   )
}