import Image from 'next/image';
import React from 'react';
import paComeLogo from '../../public/assets/logoPaCome.png';
import Link from 'next/link';
import { createStyles, Select } from '@mantine/core';
import Head from 'next/head';

const useStyles = createStyles(() => ({
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1A579A',
    fontFamily: 'poppins',
  },
}));

const Register = () => {
  const { classes } = useStyles();
  return (
    <div className="h-screen flex flex-col bg-white">
      <Head>
        <title>Pa&apos; Come | Registro</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#47ADF5]/30 h-[93%] flex justify-center items-center">
        <div
          id="scrollbar"
          className="w-10/12 lg:w-8/12 overflow-auto flex flex-col md:flex-row h-auto max-h-[96%] py-10 md:py-0 bg-white shadow-lg rounded-lg"
        >
          <div className="md:w-5/12  flex justify-center items-center shrink-0 md:h-auto relative">
            <Image className="shrink-0" width={200} src={paComeLogo} alt="" />
          </div>
          <div className="w-0.5 bg-gray-100 my-10 hidden md:flex rounded-full"></div>
          <div className="md:w-7/12 md:h-full">
            <form className=" h-full px-6 md:p-10 flex flex-col gap-2">
              <div className="self-center text-xl text-[#003579] my-3 md:my-0 font-bold font-[poppins]">
                Regístrate
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                  Nombre(s)
                </span>
                <input
                  type="text"
                  placeholder="Nombre(s)"
                  className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                  Apellido(s)
                </span>
                <input
                  type="text"
                  placeholder="Apellido(s)"
                  className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                  Correo corporativo(si aplica)
                </span>
                <input
                  type="email"
                  placeholder="Correo"
                  className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Cédula
                  </span>
                  <input
                    type="text"
                    placeholder="Cédula"
                    className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full"
                  />
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Dirección
                  </span>
                  <input
                    type="text"
                    placeholder="Dirección"
                    className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                  Contraseña
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                  Confirmar contraseña
                </span>
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                  Empresa
                </span>
                <Select
                  classNames={{
                    input: classes.input,
                  }}
                  placeholder="Seleccionar"
                  data={[{ value: 'OGTIC', label: 'OGTIC' }]}
                />
              </div>
              <Link href="/login">
                <button className="bg-[#0064CE] hover:bg-blue-500 transition-all mt-3 text-white uppercase font-bold w-full rounded-lg py-2">
                  Registrar
                </button>
              </Link>
              <div className="flex gap-1 self-center text-[10px] flex-wrap justify-center sm:text-xs font-[poppins]">
                <span className="text-[#1A579A] font-semibold">
                  ¿Ya te has registrado?
                </span>
                <Link
                  className="uppercase italic text-blue-400 underline underline-offset-2 font-semibold"
                  href="/login"
                >
                  Inicia Sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-white h-[7%] flex justify-center text-center items-center font-[poppins] text-[#1A579A] font-semibold text-[12px] sm:text-sm">
        © 2022 Todos los derechos reservados
      </div>
    </div>
  );
};

export default Register;
