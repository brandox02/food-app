import { Menu } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import logoPaCome from '../../../public/assets/logoPaCome.png';
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronDown,
  FiHome,
  FiList,
  FiMapPin,
  FiUser,
} from 'react-icons/fi';
import { RiUserLine } from 'react-icons/ri';
import { MdOutlineDining } from 'react-icons/md';
import { BiFoodMenu } from 'react-icons/bi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { useAppContext } from '../../AppProvider';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(true);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  const [{ user }] = useAppContext();

  return (
    <div className="w-full h-full">
      <div className="w-full h-screen flex">
        <div
          className={
            sidebar
              ? 'w-[300px] flex flex-col h-full min-h-screen bg-[#0064CE] z-50 px-5 py-6 transition-all'
              : 'w-[75px] flex flex-col items-center bg-[#0064CE] h-full min-h-screen z-50 px-5 py-6 transition-all'
          }
        >
          <div className="pb-4 flex">
            <div className="justify-center flex items-center mb-4 sm:mb-0">
              <Menu shadow="md" width={250} position="bottom-start">
                <Menu.Target>
                  <div className="cursor-pointer flex items-center gap-2">
                    <button className="bg-[#2493ee] cursor-pointer rounded-full p-3 hover:bg-blue-400 transition-all text-white font-semibold uppercase text-sm">
                      <RiUserLine className="w-5 h-5" />
                    </button>
                    <div
                      className={
                        sidebar
                          ? 'flex items-center gap-1'
                          : 'hidden items-center gap-1'
                      }
                    >
                      <span className="text-white font-[600] font-[poppins]">
                        {user && `${user.firstname} ${user.lastname}`}
                      </span>
                      <span className="text-white">
                        <FiChevronDown />
                      </span>
                    </div>
                  </div>
                </Menu.Target>

                <Menu.Dropdown className="rounded-xl">
                  {user && (
                    <>
                      <Menu.Label className="text-center italic text-blue-600/50">
                        {`Departamento de ${user.department.name}`}
                      </Menu.Label>
                      <Menu.Label className="text-center flex items-center font-normal justify-center gap-1 italic uppercase">
                        <FiMapPin />{' '}
                        {`${user.company.name} ${user.company.sede}`}
                      </Menu.Label>
                      <Menu.Divider />
                    </>
                  )}
                  <Link href="/customer/my-account">
                    <Menu.Item className="text-gray-500 font-[poppins] px-5">
                      Mi Cuenta
                    </Menu.Item>
                  </Link>
                  <Menu.Item className="text-red-400 font-[poppins] px-5">
                    Cerrar Sesión
                  </Menu.Item>
                  <Link href="/">
                    <Menu.Item className="text-gray-500 font-[poppins] px-5">
                      Portal Empleados
                    </Menu.Item>
                  </Link>
                  <Link href="/admin/dashboard">
                    <Menu.Item className="text-gray-500 font-[poppins] px-5">
                      Gestion EMP - Admin
                    </Menu.Item>
                  </Link>
                  <Link href="/enterprise/dashboard">
                    <Menu.Item className="text-gray-500 font-[poppins] px-5">
                      Gestion Empresarial
                    </Menu.Item>
                  </Link>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
          <div className=" py-3 h-full">
            <ul
              className={
                sidebar
                  ? 'flex flex-col gap-0 font-[poppins]'
                  : 'flex flex-col items-center gap-0 font-[poppins]'
              }
            >
              <Link href="/admin/dashboard">
                <li
                  className={
                    router.pathname == '/admin/dashboard'
                      ? 'py-4 flex items-center gap-2 text-sm rounded-md font-bold text-white hover:text-gray-300 transition-all'
                      : 'py-4 flex items-center gap-2 text-sm rounded-md text-white hover:text-gray-300 transition-all'
                  }
                >
                  <FiHome className="w-5 h-5" />{' '}
                  <span className={sidebar ? 'block' : 'hidden'}>
                    Dashboard
                  </span>
                </li>
              </Link>
              <div className="mt-3">
                <span className="text-[9px] text-blue-300 italic">
                  Organización
                </span>
              </div>
              <Link href="/admin/empleados">
                <li
                  className={
                    router.pathname == '/admin/empleados'
                      ? 'py-4 flex items-center gap-2 text-sm rounded-md font-bold text-white hover:text-gray-300 transition-all'
                      : 'py-4 flex items-center gap-2 text-sm rounded-md text-white hover:text-gray-300 transition-all'
                  }
                >
                  <FiUser className="w-5 h-5" />{' '}
                  <span className={sidebar ? 'block' : 'hidden'}>
                    Empleados
                  </span>
                </li>
              </Link>
              <div className="mt-3">
                <span className="text-[9px] text-blue-300 italic">
                  Monitoreo
                </span>
              </div>
              <Link href="/admin/pedidos">
                <li
                  className={
                    router.pathname == '/admin/pedidos'
                      ? 'py-4 flex items-center gap-2 text-sm rounded-md font-bold text-white hover:text-gray-300 transition-all'
                      : 'py-4 flex items-center gap-2 text-sm rounded-md text-white hover:text-gray-300 transition-all'
                  }
                >
                  <MdOutlineDining className="w-5 h-5" />{' '}
                  <span className={sidebar ? 'block' : 'hidden'}>Pedidos</span>
                </li>
              </Link>
              <Link href="/admin/ordenes">
                <li
                  className={
                    router.pathname == '/admin/ordenes'
                      ? 'py-4 flex items-center gap-2 text-sm rounded-md font-bold text-white hover:text-gray-300 transition-all'
                      : 'py-4 flex items-center gap-2 text-sm rounded-md text-white hover:text-gray-300 transition-all'
                  }
                >
                  <FiList className="w-5 h-5" />{' '}
                  <span className={sidebar ? 'block' : 'hidden'}>Ordenes</span>
                </li>
              </Link>
              <Link href="/admin/reportes">
                <li
                  className={
                    router.pathname == '/admin/reportes'
                      ? 'py-4 flex items-center gap-2 text-sm rounded-md font-bold text-white hover:text-gray-300 transition-all'
                      : 'py-4 flex items-center gap-2 text-sm rounded-md text-white hover:text-gray-300 transition-all'
                  }
                >
                  <HiOutlineDocumentReport className="w-5 h-5" />{' '}
                  <span className={sidebar ? 'block' : 'hidden'}>Reportes</span>
                </li>
              </Link>
              <div className="mt-3">
                <span className="text-[9px] text-blue-300 italic">
                  Configuración
                </span>
              </div>
              <Link href="/admin/menu">
                <li
                  className={
                    router.pathname == '/admin/menu'
                      ? 'py-4 flex items-center gap-2 text-sm rounded-md font-bold text-white hover:text-gray-300 transition-all'
                      : 'py-4 flex items-center gap-2 text-sm rounded-md text-white hover:text-gray-300 transition-all'
                  }
                >
                  <BiFoodMenu className="w-5 h-5" />{' '}
                  <span className={sidebar ? 'block' : 'hidden'}>
                    Administrar Menú
                  </span>
                </li>
              </Link>
            </ul>
          </div>
          <div className="text-white text-[10px] flex font-[poppins]">
            {sidebar ? (
              <span>© 2022 Todos los derechos reservados</span>
            ) : (
              <span>© 2022</span>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="bg-white w-full flex items-center justify-between px-3 py-1 border-b">
            <div
              onClick={handleSidebar}
              className="cursor-pointer flex py-2 h-fit justify-center items-center z-40 transition-all"
            >
              {sidebar ? (
                <FiArrowLeft className="text-blue-300" size={20} />
              ) : (
                <FiArrowRight className="text-blue-300" size={20} />
              )}
              <AiOutlineMenu className="text-[#003876]" size={30} />
            </div>
            <div className="flex flex-col items-end pr-3">
              <Link href="/admin/dashboard">
                <Image
                  className="cursor-pointer"
                  width={120}
                  height={80}
                  src={logoPaCome}
                  alt="/"
                />
              </Link>
              <span className="text-[#47ADF5] font-[poppins] italic text-xs md:text-sm text-right">
                Gestion empresarial - Administrativa
              </span>
            </div>
          </div>
          <div
            id="scrollbar"
            className="w-full h-full bg-white overflow-auto px-5 py-8"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
