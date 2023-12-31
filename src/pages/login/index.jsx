import Image from 'next/image';
import React from 'react';
import paComeLogo from '../../../public/assets/logoPaCome.png';
import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import Head from 'next/head';
import { FormProvider } from '../../components/react-hook-form/FormProvider';
import { useActions } from './useActions';
import { RHFTextInput } from '../../components/react-hook-form/RHFTextInput';

const Login = () => {
  const { methods, onSubmit } = useActions();
  return (
    <div className="h-screen flex flex-col bg-white">
      <Head>
        <title>Pa&apos; Come | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#47ADF5]/30 h-[93%] flex justify-center items-center">
        <div className="w-10/12 lg:w-8/12 overflow-auto flex flex-col md:flex-row py-5 h-auto bg-white shadow-lg rounded-lg">
          <div className="md:w-5/12 flex justify-center items-center shrink-0 md:h-auto relative">
            <Image
              className="shrink-0"
              width={200}
              height={200}
              src={paComeLogo}
              alt=""
            />
          </div>
          <div className="w-0.5 bg-gray-100 my-10 hidden md:flex rounded-full"></div>
          <div className="md:w-7/12 md:h-full">
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <div className=" h-full px-6 py-2 md:p-10 flex flex-col gap-4">
                <div className="self-center hidden md:flex bg-blue-300 rounded-full p-2.5">
                  <AiOutlineUser className="text-white w-8 h-8" />
                </div>
                <div className="self-center text-xl text-[#003579] pt-4 md:pt-0 font-bold font-[poppins]">
                  Inicia Sesión
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Correo electrónico
                  </span>
                  <RHFTextInput name={'email'} placeholder={'Email'} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Contraseña
                  </span>
                  <RHFTextInput
                    type="password"
                    name={'password'}
                    placeholder={'Contraseña'}
                  />
                  {/* <Link
                    className="self-end mt-1 italic underline underline-offset-2 text-xs sm:text-sm text-blue-400"
                    href="#"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link> */}
                </div>

                <button
                  type="submit"
                  className="bg-[#0064CE] hover:bg-blue-500 transition-all text-white uppercase font-bold w-full rounded-lg py-2"
                >
                  Ingresar
                </button>

                <div className="flex gap-1 self-center text-[10px] flex-wrap justify-center sm:text-xs font-[poppins]">
                  <span className="text-[#1A579A] font-semibold">
                    ¿Aún no te has registrado?
                  </span>
                  <Link
                    className="uppercase italic text-blue-400 underline underline-offset-2 font-semibold"
                    href="/register"
                  >
                    Regístrate
                  </Link>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
      <div className="bg-white h-[7%] flex justify-center text-center items-center font-[poppins] text-[#1A579A] font-semibold text-[12px] sm:text-sm">
        © 2022 Todos los derechos reservados
      </div>
    </div>
  );
};

export default Login;
