import { Modal, Pagination, Table } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { RiCoinsLine } from 'react-icons/ri';
import AdminLayout from '../../../components/admin/Layout';
import pdfexport from '../../../../public/assets/pdfexport.png';
import docexport from '../../../../public/assets/docexport.png';
import xlsexport from '../../../../public/assets/xlsexport.png';
import { AiOutlineCheck } from 'react-icons/ai';
import { useActions } from './useActions';
import { useState } from 'react';

const Ordenes = () => {
  const { orders, setPage, totalPages, totalItems, noOrderInput, setNoOrderInput } = useActions();

  const rows = orders.map((order) => (
    <tr key={order.id}>
      <td>{order.noOrder}</td>
      <td>{dayjs(order.createdAt).format('hh:mmA')}</td>
      <td>{`${order.user.firstname} ${order.user.lastname}`}</td>
      <td>{order.user.department.name}</td>
      <td>
        <div className="cursor-pointer underline underline-offset-2 text-blue-400">
          Ver detalles
        </div>
      </td>
    </tr>
  ));
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Head>
        <title>Pa&apos; Come Admin | Ordenes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div className="w-full flex flex-col gap-8">
          <div className="w-fit">
            <span className="text-blue-900 text-2xl font-semibold">
              Ordenes
            </span>
            <div className="h-[3px] w-16 bg-blue-400 self-start rounded-full" />
          </div>

          <div className="-mb-3">
            <span className="text-md italic font-semibold text-blue-400">
              Filtro de búsqueda
            </span>
          </div>

          <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="w-full flex-wrap md:flex-nowrap flex items-end gap-3">
              <div className="flex w-full sm:w-[60%] flex-col gap-1">
                <span className="text-[#003579] font-[poppins] text-sm">
                  Buscar por No. Ordern:
                </span>
                <input
                  value={noOrderInput}
                  onChange={evt => setNoOrderInput(evt.currentTarget.value)}
                  placeholder="No. Orden"
                  className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                />
              </div>
              <div className="flex gap-1 text-sm bg-blue-600 hover:bg-blue-500 text-white uppercase items-center rounded-lg px-3 py-2">
                <FiSearch />
                <span>
                  <button type="submit">Buscar</button>
                </span>
              </div>
            </div>
            {/* <div className="w-full flex-wrap md:flex-nowrap flex items-end gap-3">
              <div className="flex w-full sm:w-[60%] flex-col gap-1">
                <span className="text-[#003579] font-[poppins] text-sm">
                  Filtra por Item:
                </span>
                <input
                  placeholder="Orden"
                  className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 text-sm bg-blue-600 hover:bg-blue-500 text-white uppercase items-center rounded-lg px-3 py-2 cursor-pointer">
                  <FiSearch />
                  <span>
                    <button type="submit">Buscar</button>
                  </span>
                </div>
                <div className="flex gap-1 text-sm bg-red-600 hover:bg-red-500 text-white uppercase items-center rounded-lg px-3 py-2 cursor-pointer">
                  <RiBrush3Line />
                  <span>
                    <button type="submit">Limpiar</button>
                  </span>
                </div>
              </div>
            </div> */}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-center gap-3">
              <span className="text-md whitespace-nowrap text-blue-900 font-semibold italic">
                Exportación de Datos
              </span>
              <div className="bg-gray-300 h-0.5 rounded-full w-full"></div>
            </div>
            <div className="flex gap-4 px-2">
              <Image className="cursor-pointer" src={pdfexport} alt="" />
              <Image className="cursor-pointer" src={docexport} alt="" />
              <Image className="cursor-pointer" src={xlsexport} alt="" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-2 items-center justify-between flex-wrap">
              <span className="text-lg italic font-semibold text-blue-400">
                Listado de ordenes entregadas hoy ({totalItems})
              </span>
              <button className="bg-green-500 flex items-center gap-2 hover:bg-green-400 uppercase font-semibold text-sm rounded py-2 px-4 text-white">
                <RiCoinsLine size={20} /> Saldar todo
              </button>
            </div>
            <div id="scrollbar" className="w-auto overflow-auto">
              <Table highlightOnHover verticalSpacing="sm">
                <thead className="bg-[#47ADF5]/30 italic font-[poppins] ">
                  <tr>
                    <th>No. Orden</th>
                    <th>Hora</th>
                    <th>Nombre</th>
                    <th>Departamento</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="font-[poppins]">{rows}</tbody>
                <Modal
                  size={'xl'}
                  centered
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title={
                    <div className="w-fit mb-5">
                      <span className="text-blue-900 text-xl font-semibold">
                        {'Detalles de Pedido'}
                      </span>
                      <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
                    </div>
                  }
                >
                  <>
                    <div>
                      <div className="bg-stone-100 flex flex-row p-2">
                        <div className="w-2/4">
                          <span className="text-blue-900 mr-2 font-semibold">
                            Nombre:
                          </span>
                          <span>Juan Perez</span>
                        </div>
                        <div className="w-2/4">
                          <span className="text-blue-900 mr-2 font-semibold">
                            Departamento:
                          </span>
                          <span>Plataformas y Servicios</span>
                        </div>
                      </div>
                      <div className="bg-stone-100 flex flex-row p-2">
                        <div className="w-2/4">
                          <span className="text-blue-900 mr-2 font-semibold">
                            Correo:
                          </span>
                          <span>juan@email.com</span>
                        </div>
                        <div className="w-2/4">
                          <span className="text-blue-900 mr-2 font-semibold">
                            Hora:
                          </span>
                          <span>12 de Mayo de 2022</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-10">
                      <span className="text-lg my-5 flex justify-center font-bold">
                        Detalles de Orden
                      </span>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Plato del dia</span>
                        <span className="text-slate-600">RD$150</span>
                      </div>
                      <div className="ml-7">
                        <div className="text-slate-600">
                          {'X'} Plato del día
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-slate-600">Extras</span>
                      </div>
                      <div className="ml-7">
                        <>
                          <div className="text-slate-600 flex justify-between">
                            <span>X Aguacate</span>
                            <span>RD$115</span>
                          </div>
                          <div className="text-xs w-3/4 text-blue-900 mb-3">
                            Comentario
                          </div>
                        </>
                      </div>
                    </div>
                    <div className="bg-stone-100 flex justify-end px-10 py-1">
                      Total: RD$245
                    </div>
                    <div className="flex justify-center">
                      <span className="text-blue-900 font-bold">
                        {'Confirmación:'}
                      </span>
                      <AiOutlineCheck
                        color="#A8DBFF"
                        size={20}
                        className="mt-1 ml-3"
                      />
                    </div>
                    <div className="flex justify-center items-center mt-1">
                      <span className="text-blue-900 font-bold">
                        {'Estado:'}
                      </span>
                      <div className=" py-1.5 flex justify-center p-3 ml-2">
                        <span className="font-semibold text-white italic">
                          Entregado
                        </span>
                      </div>
                    </div>
                  </>
                </Modal>
              </Table>
              <Pagination total={totalPages} onChange={e => setPage(e - 1)} />;
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Ordenes;
