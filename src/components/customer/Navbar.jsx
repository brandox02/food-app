import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import logoPaCome from '../../../public/assets/logoPaCome.png';
import { useState } from 'react';
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMenuUnfold,
} from 'react-icons/ai';
import { FiChevronDown, FiMapPin, FiShoppingCart } from 'react-icons/fi';
import { RiUserLine } from 'react-icons/ri';
import { Menu } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import { useAppContext } from '../../AppProvider';

export const Navbar = () => {
  const router = useRouter();
  const [nav, setNav] = useState(false);
  const { logout } = useAuth();
  const [{ user }] = useAppContext();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="lg:px-24 relative max-w-[1750px] mb-6 sm:mb-0 mx-auto w-full px-5 py-3 flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center gap-6 bg-white shadow-lg">
        <Link href="/">
          <Image
            className="cursor-pointer"
            width={100}
            height={80}
            src={logoPaCome}
            alt="/"
          />
        </Link>
        <div className="justify-center hidden sm:flex items-center mb-4 sm:mb-0">
          <Menu shadow="md" width={250} position="bottom-end">
            <Menu.Target>
              <div className="cursor-pointer flex items-center gap-2">
                <button className="bg-[#2493ee] cursor-pointer rounded-full p-3 hover:bg-blue-400 transition-all text-white font-semibold uppercase text-sm">
                  <RiUserLine className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  <span className="text-[#1A579A] font-[600] font-[poppins]">
                    {user && `${user.firstname} ${user.lastname}`}
                  </span>
                  <span className="text-blue-500">
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
                    <FiMapPin /> {`${user.company.name} ${user.company.sede}`}
                  </Menu.Label>
                  <Menu.Divider />
                </>
              )}
              <Link href="/customer/historial">
                <Menu.Item className="text-gray-500 font-[poppins] px-5">
                  Historial de Consumo
                </Menu.Item>
              </Link>
              <Link href="/customer/my-account">
                <Menu.Item className="text-gray-500 font-[poppins] px-5">
                  Mi Cuenta
                </Menu.Item>
              </Link>
              <Menu.Item
                className="text-red-400 font-[poppins] px-5"
                onClick={logout}
              >
                Cerrar Sesión
              </Menu.Item>
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
        <div
          onClick={handleNav}
          className="sm:hidden cursor-pointer fixed bg-white z-40 rounded-2xl border-2 border-[#003876] p-2 right-0 mx-5 xs:mx-10 sm:mx-0 active:scale-90 transition-all"
        >
          <AiOutlineMenu className="text-[#003876]" size={30} />
        </div>
      </div>

      <div className=" sm:px-5 lg:px-24 hidden sm:flex mb-6">
        <div className="md:max-w-[1750px] bg-[#1A579A] rounded-lg mx-auto w-full flex  flex-wrap justify-center xl:justify-between px-2 md:px-10 min-h-[50px] py-4 gap-4  ">
          <div className="flex gap-10">
            <Link href="/customer/menu">
              <button
                className={
                  router.pathname == '/customer/lunch'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Plato del día
              </button>
            </Link>
            <Link href="/customer/cafeteria">
              <button
                className={
                  router.pathname == '/customer/cafeteria'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Cafetería
              </button>
            </Link>
            <Link href="/customer/breakfast">
              <button
                className={
                  router.pathname == '/customer/breakfast'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Desayunos
              </button>
            </Link>
            <Link href="/customer/pastry">
              <button
                className={
                  router.pathname == '/customer/pastry'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Repostería
              </button>
            </Link>
            <Link href="/customer/bakery">
              <button
                className={
                  router.pathname == '/customer/bakery'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Panadería
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/customer/ordenes">
              <button className="bg-green-500 hover:bg-green-400 flex items-center gap-1 justify-center rounded-full py-1.5 uppercase text-white text-sm px-3">
                <AiOutlineMenuUnfold className="w-5 h-5" />
                <span>Ordenes</span>
              </button>
            </Link>
            <Link href="/customer/carrito">
              <button className="bg-blue-500 hover:bg-blue-400 flex items-center gap-1 justify-center rounded-full py-1.5 uppercase text-white text-sm px-3">
                <FiShoppingCart />
                <span>Ver Carrito</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={
          nav
            ? 'sm:hidden fixed z-50 left-0 top-0 w-full h-full min-h-screen bg-black/60 transition-all duration-1000'
            : 'fixed z-50 invisible w-full h-full min-h-screen transition-all duration-1000'
        }
      >
        <div
          className={
            nav
              ? 'sm:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-full min-h-screen bg-white z-50 px-5 py-10 xs:p-10 transition-all duration-1000'
              : 'fixed left-[-100%] top-0 w-[75%] sm:w-[60%] md:w-[45%] bg-white h-full min-h-screen z-50 px-5 py-10 xs:p-10 transition-all duration-1000'
          }
        >
          <div>
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image
                  className="cursor-pointer"
                  src={logoPaCome}
                  alt="/"
                  width="80"
                  height="45"
                />
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full border-2 border-[#003876] p-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <AiOutlineClose className="text-[#003876]" size={15} />
              </div>
            </div>
            <p className="w-full py-4 text-xs xs:text-base font-bold text-[#003876]">
              Servicios de Comida Empresarial
            </p>
            <div className="border-b border-gray-300 pb-4">
              <div className="cursor-pointer flex items-center gap-2">
                <button className="bg-[#2493ee] cursor-pointer rounded-full p-3 hover:bg-blue-400 transition-all text-white font-semibold uppercase text-sm">
                  <RiUserLine className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  <span className="text-[#1A579A] font-[600] font-[poppins]">
                    {user && `${user.firstname} ${user.lastname}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b py-3">
            <ul className="uppercase flex flex-col gap-0">
              <Link href="/customer/lunch">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/customer/lunch'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Plato del día
                </li>
              </Link>
              <Link href="/customer/cafeteria">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/customer/cafeteria'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Cafetería
                </li>
              </Link>
              <Link href="/customer/breakfast">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/customer/breakfast'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Desayunos
                </li>
              </Link>
              <Link href="/customer/pastry">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/customer/pastry'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Repostería
                </li>
              </Link>
              <Link href="/customer/bakery">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/customer/bakery'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Panadería
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
