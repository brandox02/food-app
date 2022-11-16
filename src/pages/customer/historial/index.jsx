import { Breadcrumbs, Select, createStyles, Table } from '@mantine/core';

import Head from 'next/head';
import Link from 'next/link';
import { FiHome, FiSearch } from 'react-icons/fi';
import { RiBrush3Line } from 'react-icons/ri';
import { RHFSelect } from '../../../components/react-hook-form/RHFSelect';
import { RHFDatePicker } from '../../../components/react-hook-form/RHFDatePicker';
import { FormProvider } from '../../../components/react-hook-form/FormProvider';
import { useActions } from './useActions';
import dayjs from 'dayjs';

const useStyles = createStyles(() => ({
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1A579A',
    fontFamily: 'poppins',
  },
}));

const Historial = () => {
  const { methods, onAction, clear, orders, moneyAccumulatedMonth } =
    useActions();

  const rows = orders.map((order) => (
    <tr key={order.id}>
      <td>{order.noOrder}</td>
      <td>{dayjs(order.createdDate).format('DD/MM/YYYY')}</td>
      <td>{dayjs(order.deliverDate).format('DD/MM/YYYY')}</td>
      <td>{'Algun producto'}</td>
      <td>{0}</td>
      <td>{order.total}</td>
    </tr>
  ));

  const { classes } = useStyles();
  const items = [
    { title: <FiHome />, href: '/' },
    { title: 'Historial de Consumos', href: '/customer/historial' },
  ].map((item, index) => (
    <Link
      className="text-[#003579] font-semibold italic hover:underline underline-offset-2"
      href={item.href}
      key={index}
    >
      {item.title}
    </Link>
  ));

  return (
    <div className="w-full flex flex-col gap-6">
      <Head>
        <title>Pa&apos; Come | Historial de Consumos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-[1750px] mx-auto lg:px-24 px-5">
        <Breadcrumbs separator=">">{items}</Breadcrumbs>
      </div>
      <div className="w-full flex flex-col gap-5 max-w-[1750px] mx-auto lg:px-24 px-5 py-8 bg-white">
        <div className=" w-fit">
          <span className="text-blue-900 text-2xl font-semibold">
            Historial de Consumos
          </span>
          <div className="h-[3px] w-44 bg-blue-400 self-start rounded-full"></div>
        </div>
        <FormProvider methods={methods} onSubmit={onAction}>
          <div className="w-full flex flex-col gap-5 lg:gap-0 md:flex-row flex-wrap">
            <div className="w-full lg:w-9/12 2xl:w-10/12 grid md:grid-cols-3 gap-3 lg:gap-5 pr-2">
              <div className="flex flex-col gap-1">
                <span className="text-[#003579] font-[poppins] text-sm">
                  Filtrar por fecha de:
                </span>

                <RHFSelect
                  name={'keyDateId'}
                  items={[
                    { id: 1, name: 'Orden' },
                    { id: 2, name: 'Entrega' },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#003579] font-[poppins] text-sm">
                  Desde:
                </span>
                <RHFDatePicker name={'fromDate'} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#003579] font-[poppins] text-sm">
                  Hasta:
                </span>
                <RHFDatePicker name={'toDate'} />
              </div>
            </div>

            <div className="w-full lg:w-3/12 2xl:w-2/12 flex lg:justify-end items-end gap-3">
              <button className="flex gap-1 text-sm bg-blue-600 hover:bg-blue-500 text-white uppercase items-center rounded-lg px-3 py-2">
                <FiSearch />
                <span>
                  <button type="submit">Buscar</button>
                </span>
              </button>
              <button
                onClick={clear}
                className="flex gap-1 text-sm bg-red-500 hover:bg-red-400 text-white uppercase items-center rounded-lg px-3 py-2"
              >
                <RiBrush3Line />
                <span>Limpiar</span>
              </button>
            </div>
          </div>
        </FormProvider>
        <div>
          <div id="scrollbar" className="w-full overflow-auto mt-6">
            <Table highlightOnHover verticalSpacing="sm">
              <thead className="bg-[#47ADF5]/30 font-[poppins] ">
                <tr>
                  <th>No. Orden</th>
                  <th>Fecha Orden</th>
                  <th>Fecha Entrega</th>
                  <th>Productos</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="font-[poppins]">{rows}</tbody>
            </Table>
          </div>
          <div className="w-full flex text-blue-900 justify-end italic px-3 sm:px-5 md:px-10 text-sm md:text-base bg-gray-100 py-1.5 font-semibold gap-1">
            Total en Curso:{' '}
            <span className="text-[#4868ae]">RD${moneyAccumulatedMonth}</span>
          </div>
        </div>
        <div className="w-full flex justify-end text-right text-xs italic text-blue-900 font-[poppins] mb-3">
          <p className="w-3/4 md:w-1/3">
            Dicho monto, será descontado automáticamente de la nómina de manera
            mensual. Una vez saldado el monto, tu historial será reseteado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Historial;
