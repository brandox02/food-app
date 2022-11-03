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
import { FiShoppingCart } from 'react-icons/fi';

export const Navbar = () => {
  const router = useRouter();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      className={
        router.pathname == '/auth/login'
          ? 'hidden'
          : '' | (router.pathname == '/auth/register')
          ? 'hidden'
          : 'flex flex-col gap-10'
      }
    >
      <div className="lg:px-24 relative max-w-[1750px] mx-auto w-full px-5 py-3 flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center gap-6 bg-white shadow-lg">
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
          <a
            href="#"
            target="_blank"
            noreferrer="true"
            className="bg-[#EE2A24] cursor-pointer rounded-full px-6 py-2.5 hover:bg-red-500 transition-all text-white font-semibold uppercase text-sm"
          >
            Perfil
          </a>
        </div>
        <div
          onClick={handleNav}
          className="sm:hidden cursor-pointer fixed bg-white z-40 rounded-lg border-2 border-[#003876] p-2 right-0 mx-5 xs:mx-10 sm:mx-0 active:scale-90 transition-all"
        >
          <AiOutlineMenu className="text-[#003876]" size={30} />
        </div>
      </div>

      <div className=" sm:px-5 lg:px-24">
        <div className="md:max-w-[1750px] max-w-[700px] bg-[#1A579A] rounded-lg mx-auto w-full hidden sm:flex flex-wrap justify-center xl:justify-between px-2 md:px-10 min-h-[50px] py-2 gap-10">
          <div className="flex gap-10">
            <Link href="/lunch">
              <button
                className={
                  router.pathname == '/lunch'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Plato del día
              </button>
            </Link>
            <Link href="/cafeteria">
              <button
                className={
                  router.pathname == '/cafeteria'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Cafetería
              </button>
            </Link>
            <Link href="/breakfast">
              <button
                className={
                  router.pathname == '/breakfast'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Desayunos
              </button>
            </Link>
            <Link href="/pastry">
              <button
                className={
                  router.pathname == '/pastry'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Repostería
              </button>
            </Link>
            <Link href="/bakery">
              <button
                className={
                  router.pathname == '/bakery'
                    ? 'md:text-sm text-xs font-semibold text-white bg-[#0064CE] px-2 min-h-[40px] h-full flex items-center rounded-lg tracking-wider font-[poppins] hover:text-blue-500'
                    : 'md:text-sm text-xs font-semibold text-white tracking-wider px-2 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500'
                }
              >
                Panadería
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-green-500 hover:bg-green-400 flex items-center gap-1 justify-center rounded-full py-1.5 uppercase text-white text-sm px-3">
              <AiOutlineMenuUnfold className="w-5 h-5" />
              <span>Ordenes</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-400 flex items-center gap-1 justify-center rounded-full py-1.5 uppercase text-white text-sm px-3">
              <FiShoppingCart />
              <span>Ver Carrito</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          nav
            ? 'sm:hidden fixed z-50 left-0 top-0 w-full h-full min-h-screen bg-black/60'
            : ''
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
            <div className="border-b border-gray-300 my-4">
              <p className="w-full py-4 text-xs xs:text-base font-bold text-[#003876]">
                Servicios de Comida Empresarial
              </p>
            </div>
          </div>
          <div className="">
            <ul className="uppercase flex flex-col gap-0">
              <Link href="/">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Acerca del censo
                </li>
              </Link>
              <Link href="/fases">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/fases'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Fases
                </li>
              </Link>
              <Link href="/faqs">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/faqs'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Preguntas Frecuentes
                </li>
              </Link>
              <Link href="/boleta-censal">
                <li
                  onClick={() => setNav(false)}
                  className={
                    router.pathname == '/boleta-censal'
                      ? 'py-4 text-sm rounded-md font-semibold text-[#EE2A24] hover:text-[#5651e5] transition-all'
                      : 'py-4 text-sm rounded-md text-black hover:text-[#5651e5] transition-all'
                  }
                >
                  Boleta Censal
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
