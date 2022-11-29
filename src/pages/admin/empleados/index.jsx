import {
  Breadcrumbs,
  createStyles,
  Group,
  Modal,
  Pagination,
  Table,
} from '@mantine/core';
import Head from 'next/head';
import { FiHome, FiSearch } from 'react-icons/fi';
import { FormProvider } from '../../../components/react-hook-form/FormProvider';
import { RiBrush3Line } from 'react-icons/ri';
import AdminLayout from '../../../components/admin/Layout';
import { useState } from 'react';
import { RHFTextInput } from '../../../components/react-hook-form/RHFTextInput';
import Link from 'next/link';
import { useActions } from './useActions';
import dayjs from 'dayjs';
import { RHFSelect } from '../../../components/react-hook-form/RHFSelect';
import { RHFDatePicker } from '../../../components/react-hook-form/RHFDatePicker';
import { RHFSwitch } from '../../../components/react-hook-form/RHFSwitch';
import { RiSave3Fill } from 'react-icons/ri';

const GestionarEmpleados = () => {
  const {
    onSubmitManagementModal,
    managementModalMethods,
    managementModalOpen,
    setManagementOpenModal,
    totalItems,
    totalPages,
    users,
    setPage,
    dateFilterMethods,
    onSeachDateFilter,
    clearFilters,
    otherFilterMethods,
    onSearchOtherFilter,
  } = useActions();
  const useStyles = createStyles(() => ({
    input: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#1A579A',
      fontFamily: 'poppins',
    },
  }));
  const { classes } = useStyles();

  const usersRow = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{`${user.firstname} ${user.lastname}`}</td>
      <td>{user.email}</td>
      <td>{dayjs(user.createdAt).format('DD/MM/YYYY')}</td>
      <td>{user.department.name}</td>
      <td
        className="cursor-pointer"
        onClick={() => setManagementOpenModal(user)}
      >
        <div className="cursor-pointer underline underline-offset-2 text-blue-500 font-semibold">
          Editar
        </div>
      </td>
    </tr>
  ));

  const [opened2, setOpened2] = useState(false);

  return (
    <>
      <Head>
        <title>Pa&apos; Come Admin | GestionarEmpleados</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div className="w-full flex flex-col gap-8">
          <div className="w-fit flex flex-col gap-3">
            {/* <div className=" flex w-full justify-start">
              <Link
                className=" bg-blue-300 rounded-full p-2 cursor-pointer"
                href="/admin/empleados"
              >
                <FiArrowLeft className="text-white w-5 h-5" />
              </Link>
            </div> */}
            <div>
              <span className="text-blue-900 text-2xl font-semibold">
                Empleados
              </span>
              <div className="h-[3px] w-24 bg-blue-400 self-start rounded-full" />
            </div>
          </div>

          <div className="-mb-3">
            <span className="text-md italic font-semibold text-blue-400">
              Filtro de búsqueda
            </span>
          </div>

          <div className="w-full flex flex-col gap-4">
            <FormProvider
              methods={dateFilterMethods}
              onSubmit={onSeachDateFilter}
            >
              <div className="w-full flex flex-col gap-5 lg:gap-0 md:flex-row flex-wrap">
                <div className="w-full lg:w-9/12 2xl:w-10/12 grid md:grid-cols-3 gap-3 lg:gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#003579] font-[poppins] text-sm">
                      Filtrar por fecha de:
                    </span>
                    <RHFSelect
                      classNames={{
                        input: classes.input,
                      }}
                      items={[
                        { name: 'Creación', id: false },
                        { name: 'Fecha de Activación', id: true },
                      ]}
                      name={'filterByEnableDate'}
                      clearable={false}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#003579] font-[poppins] text-sm">
                      Desde:
                    </span>
                    <RHFDatePicker name={'fromDate'} clearable={false} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#003579] font-[poppins] text-sm">
                      Hasta:
                    </span>
                    <RHFDatePicker name={'toDate'} clearable={false} />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 2xl:w-2/12 flex lg:justify-end items-end gap-3">
                  <button className="flex cursor-pointer gap-1 text-sm bg-blue-600 hover:bg-blue-500 text-white uppercase items-center rounded-lg px-3 py-2">
                    <FiSearch />
                    <span>Buscar</span>
                  </button>
                  <span
                    onClick={clearFilters}
                    className="cursor-pointer flex gap-1 text-sm bg-red-500 hover:bg-red-400 text-white uppercase items-center rounded-lg px-3 py-2"
                  >
                    <RiBrush3Line />
                    Limpiar
                  </span>
                </div>
              </div>
            </FormProvider>
            <div
              style={{ borderTop: '3px solid #E9ECEF' }}
              className="my-1"
            ></div>
            <FormProvider
              methods={otherFilterMethods}
              onSubmit={onSearchOtherFilter}
            >
              <div className="w-full flex-wrap md:flex-nowrap flex items-end gap-3">
                <div className="flex w-full sm:w-[50%] flex-col gap-1">
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Buscar por nombre:
                  </span>
                  <RHFTextInput name={'name'} placeholder="Nombre" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Filtrar por activados:
                  </span>
                  <RHFSelect
                    name={'enabled'}
                    placeholder={'No filtrar'}
                    items={[
                      { id: false, name: 'No' },
                      { id: true, name: 'Sí' },
                    ]}
                  />
                </div>
                {/* <button className="mr-4 flex cursor-pointer gap-1 text-sm bg-blue-600 hover:bg-blue-500 text-white uppercase items-center rounded-lg px-3 py-2">
                  <FiSearch />
                  <span>
                    Buscar
                  </span>
                </button> */}
              </div>
            </FormProvider>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 items-center justify-between flex-wrap">
              <span className="text-lg italic font-semibold text-blue-400">
                Listado de empleados ({totalItems})
              </span>
            </div>
            <div className="flex items-center">
              {/* <button
                onClick={() => setOpened2(true)}
                className="bg-blue-500 flex items-center gap-2 hover:bg-blue-400 uppercase font-semibold text-sm rounded py-2 px-4 text-white"
              >
                <FiPlusCircle size={20} /> Agregar empleado
              </button> */}
            </div>
            <div id="scrollbar" className="w-auto overflow-auto">
              <Table highlightOnHover verticalSpacing="sm">
                <thead className="bg-[#47ADF5]/30 italic font-[poppins] ">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Fecha de creación</th>
                    <th>Departamento</th>
                    <th />
                  </tr>
                </thead>
                <tbody className="font-[poppins]">{usersRow}</tbody>
              </Table>
              <Pagination onChange={setPage} total={totalPages} />
              <Modal
                size={'lg'}
                centered
                opened={managementModalOpen}
                onClose={() => setManagementOpenModal(null)}
                title={
                  <div className="w-fit mb-5">
                    <span className="text-blue-900 text-xl font-semibold">
                      {'Editar empleado'}
                    </span>
                    <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
                  </div>
                }
              >
                <FormProvider
                  methods={managementModalMethods}
                  onSubmit={onSubmitManagementModal}
                >
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Nombre(s):
                  </span>
                  <RHFTextInput name={'firstname'} />
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Apellido(s):
                  </span>
                  <RHFTextInput name={'lastname'} />
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Email:
                  </span>
                  <RHFTextInput
                    name={'email'}
                    disabled
                    className={'cursor-no-drop'}
                  />
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Cédula:
                  </span>
                  <RHFTextInput
                    name={'cedula'}
                    disabled
                    className={'cursor-no-drop'}
                  />
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Departamento:
                  </span>
                  <RHFTextInput
                    name={'department'}
                    disabled
                    className={'cursor-no-drop'}
                  />
                  <span className="text-[#003579] font-[poppins] text-sm">
                    Compañia:
                  </span>

                  <RHFTextInput
                    name={'company'}
                    disabled
                    className={'cursor-no-drop'}
                  />

                  <div className="text-sm">Fecha de Creación:</div>
                  <input
                    value={dayjs(
                      managementModalMethods.watch('createdAt')
                    ).format('DD/MM/YYYY')}
                    className="cursor-no-drop border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                    disabled
                  />
                  <div className="text-sm">Fecha de Activación:</div>
                  <input
                    value={dayjs(
                      managementModalMethods.watch('enableDate')
                    ).format('DD/MM/YYYY')}
                    className="cursor-no-drop mb-1 border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                    disabled
                  />
                  <RHFSwitch name={'enabled'} label={'Habilitado'} />
                  <Group className="flex justify-end">
                    <button className="flex cursor-pointer gap-1 text-sm bg-blue-600 hover:bg-blue-500 text-white uppercase items-center rounded-lg px-3 py-2">
                      <RiSave3Fill />
                      <span>Editar</span>
                    </button>
                  </Group>
                </FormProvider>
              </Modal>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default GestionarEmpleados;
