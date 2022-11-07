import { Tabs } from '@mantine/core';
import Image from 'next/image';
import { FiCamera } from 'react-icons/fi';
import { RiLock2Line, RiUser2Fill } from 'react-icons/ri';
import profilePicture from '../../../public/assets/profilepicture.png';

const Profile = () => {
  return (
    <div className="w-full ">
      <div className="w-full max-w-[1750px] mx-auto lg:px-24 px-5 grid md:grid-cols-4 gap-3">
        <div className=" grid w-full md:col-span-3 gap-5 ">
          <Tabs
            styles={() => ({
              tab: {
                '&[data-active]': {
                  background: '#1a579a',
                },
              },
            })}
            variant="pills"
            defaultValue="gallery"
          >
            <Tabs.List className="px-10 rounded-t-lg mb-3">
              <Tabs.Tab
                className="font-bold text-sky-600"
                value="gallery"
                icon={<RiUser2Fill />}
              >
                Información de Cuenta
              </Tabs.Tab>

              <Tabs.Tab
                className="font-bold text-sky-600"
                value="messages"
                icon={<RiLock2Line />}
              >
                Cambiar Contraseña
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel
              className="px-10 py-8 space-y-10 rounded-md bg-white"
              value="gallery"
              pt="xs"
            >
              <div className="grid md:grid-cols-3 col-span-3 gap-x-5 gap-y-3">
                <div className=" md:col-span-3 w-full">
                  <span className="text-blue-900 text-2xl font-semibold">
                    General
                  </span>
                  <div className="h-[3px] w-24 bg-blue-400 self-start rounded-full"></div>
                </div>
                <div className=" flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Nombre(s)
                  </span>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
                <div className=" flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Apellido(s)
                  </span>
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
                <div className=" flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Correo electrónico
                  </span>
                  <input
                    type="email"
                    placeholder="Correo"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 col-span-3 gap-x-5 gap-y-3">
                <div className=" md:col-span-3 w-full">
                  <span className="text-blue-900 text-2xl font-semibold">
                    Información Personal
                  </span>
                  <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
                </div>
                <div className=" flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Cédula
                  </span>
                  <input
                    type="text"
                    placeholder="Correo electrónico"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Teléfono
                  </span>
                  <input
                    type="text"
                    placeholder="Correo electrónico"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Departamento
                  </span>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
              </div>

              <div className="w-full flex justify-center pt-10">
                <button className="bg-sky-800 rounded-md px-14 py-2 uppercase text-white text-sm">
                  Guardar Cambios
                </button>
              </div>
            </Tabs.Panel>

            <Tabs.Panel
              className="px-10 py-8 rounded-md space-y-5 bg-white"
              value="messages"
              pt="xs"
            >
              <div className="grid md:grid-cols-3 col-span-3 gap-x-5 gap-y-6">
                <div className=" md:col-span-3 w-full">
                  <span className="text-blue-900 text-2xl font-semibold">
                    Cambiar Contraseña
                  </span>
                  <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
                </div>
                <div className=" flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Contraseña Actual
                  </span>
                  <input
                    type="text"
                    placeholder="*******"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
                <div className=" flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Contraseña Nueva
                  </span>
                  <input
                    type="text"
                    placeholder="*******"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
                <div className=" flex flex-col gap-0.5">
                  <span className="font-[poppins] text-sm md:text-base text-[#003579] font-semibold">
                    Confirmar Contraseña
                  </span>
                  <input
                    type="email"
                    placeholder="*******"
                    className="border-2 border-[#1A579A] px-3 py-2 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                  />
                </div>
              </div>

              <div className="w-full flex justify-center pt-10">
                <button className="bg-sky-800 rounded-md px-14 py-2 uppercase text-white text-sm">
                  Guardar Cambios
                </button>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>

        <div className="w-full bg-white md:mt-[45px] rounded-md">
          <div className="flex flex-col items-center gap-4 py-12 h-full">
            <div className="w-[140px] h-[140px] rounded-full ring-2 ring-sky-600 relative">
              <Image
                layout="fill"
                className="rounded-full"
                src={profilePicture}
                alt=""
              />
            </div>
            <div className="flex items-center text-xs gap-1 cursor-pointer text-white bg-sky-700 hover:bg-sky-600 rounded-full px-3 py-1.5 w-fit">
              <FiCamera />
              <span className="uppercase font-semibold">Editar foto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
