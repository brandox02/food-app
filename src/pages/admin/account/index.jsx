import { Tabs } from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { RiLock2Line, RiUser2Fill } from 'react-icons/ri';
import AdminLayout from '../../../components/admin/Layout';
import { FormProvider } from '../../../components/react-hook-form/FormProvider';
import { RHFTextInput } from '../../../components/react-hook-form/RHFTextInput';
import { RHFSelectWithQuery } from '../../../components/react-hook-form/RHFSelectWithQuery';
import { ImagePicker } from '../../../components/image-picker';
import { ZoomImage } from '../../../components/menu/accesories/ZoomImage';
import { useActions } from './useActions';
import { gql } from '@apollo/client';
import unknownImage from '../../../../public/assets/unknown-profile.jpg'

const Account = () => {
   const [saved, setSaved] = useState(false);
   const [open, setOpen] = useState(false);
   const { methods, onSubmit, setTab, user } = useActions();
   return (
      <>
         <Head>
            <title>Pa&apos; Come Admin | Cuenta</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <AdminLayout>
            <div className="w-full max-w-[1750px] mx-auto lg:px-24 px-5 grid md:grid-cols-4 gap-5">
               <div className=" grid w-full md:col-span-3 gap-5 order-2 md:order-1">
                  <FormProvider methods={methods} onSubmit={onSubmit}>
                     <Tabs
                        className="flex flex-col"
                        styles={() => ({
                           tab: {
                              '&[data-active]': {
                                 background: '#1a579a',
                              },
                           },
                        })}
                        value={methods.watch('tabSelected')}
                        variant="pills"
                        defaultValue="1"


                     >
                        <Tabs.List className=" mb-3 flex justify-center md:justify-start" >
                           <Tabs.Tab
                              onClick={() => setTab('1')}
                              className="font-bold text-sky-600"
                              value="1"
                              icon={<RiUser2Fill />}
                           >
                              Información de Cuenta
                           </Tabs.Tab>

                           <Tabs.Tab
                              onClick={() => setTab('2')}
                              className="font-bold text-sky-600"
                              value="2"
                              icon={<RiLock2Line />}
                           >
                              Cambiar Contraseña
                           </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel
                           className="px-10 py-8 space-y-10 rounded-md bg-white"
                           value="1"
                           pt="xs"
                        >
                           <div className="grid lg:grid-cols-3 col-span-3 gap-x-5 gap-y-5">
                              <div className=" lg:col-span-3 w-full mb-1">
                                 <span className="text-blue-900 text-2xl font-semibold">
                                    Información de la empresa
                                 </span>
                                 <div className="h-[3px] w-16 bg-blue-400 self-start rounded-full"></div>
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Nombre
                                 </span>
                                 <RHFTextInput name={'company.name'} />
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    SEDE
                                 </span>
                                 <RHFTextInput name={'company.sede'} />
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Ubicación
                                 </span>
                                 <RHFTextInput name={'company.location'} />
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Acrónimo
                                 </span>
                                 <RHFTextInput name={'company.acronym'} />
                              </div>
                           </div>
                           <div className="grid lg:grid-cols-3 col-span-3 gap-x-5 gap-y-5">
                              <div className=" lg:col-span-3 w-full mb-1">
                                 <span className="text-blue-900 text-2xl font-semibold">
                                    Información Personal
                                 </span>
                                 <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Nombre(s)
                                 </span>
                                 <RHFTextInput name={'user.firstname'} />
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Apellido(s)
                                 </span>
                                 <RHFTextInput name={'user.lastname'} />
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Correo electrónico
                                 </span>
                                 <RHFTextInput disabled={true} type='email' name={'user.email'} />
                              </div>
                              <div className=" flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Cédula
                                 </span>
                                 <RHFTextInput disabled={true} name={'user.cedula'} />
                              </div>

                              <div className="flex flex-col gap-0.5">
                                 <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                    Departamento
                                 </span>
                                 <RHFSelectWithQuery
                                    name={'user.departmentId'}
                                    variables={{ where: { companyId: methods.watch('companyId') } }}
                                    query={gql`
                                       query DepartmentList($where: DepartmentWhereInput) {
                                       items: departmentList(where:$where) {
                                          id
                                          createdAt
                                          updatedAt
                                          name
                                       }
                                       }
                                    `}
                                 />
                              </div>
                           </div>

                           <div className="w-full flex flex-col items-center gap-4 justify-center pt-10">
                              <button
                                 className={

                                    'bg-sky-800 rounded-md px-14 py-2 uppercase text-white text-sm font-semibold'
                                 }
                              >
                                 Guardar Cambios
                              </button>
                           </div>
                        </Tabs.Panel>

                        <Tabs.Panel
                           className="px-10 py-8 rounded-md space-y-5 bg-white"
                           value="2"
                           pt="xs"
                        >
                           <div className="grid col-span-3 gap-x-5 gap-y-6">
                              <div className=" w-full">
                                 <span className="text-blue-900 text-2xl font-semibold">
                                    Cambiar Contraseña
                                 </span>
                                 <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
                              </div>
                              <div className="flex flex-col md:flex-row gap-5 ">
                                 <div className="flex flex-col w-full gap-5">
                                    <div>
                                       <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                          Contraseña Actual
                                       </span>
                                       <RHFTextInput name={'currentPass'} type='password' />
                                    </div>
                                    <div>
                                       <p className="text-xs text-gray-500 italic mt-2">
                                          Nota: Tu contraseña debe ser mayor o igual a 8
                                          caracteres, debe incluir números. Utilice una
                                          combinación de mayúsculas y minúsculas. Debe incluir
                                          caracteres especiales: - * ? ! @ # $ / () { } = . , ; :
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-5 w-full">
                                    <div className="flex flex-col gap-0.5">
                                       <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                          Contraseña Nueva
                                       </span>
                                       <RHFTextInput name={'newPass1'} type='password' />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                       <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                                          Confirmar Contraseña
                                       </span>
                                       <RHFTextInput name={'newPass2'} type='password' />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="w-full flex justify-center  pt-10">
                              <button className="bg-sky-800 rounded-md px-14 py-2 uppercase text-white text-sm">
                                 Guardar Cambios
                              </button>
                           </div>
                        </Tabs.Panel>
                     </Tabs>
                  </FormProvider>
               </div>

               <div className="w-full bg-white md:mt-[45px] rounded-md order-1">
                  <div className="flex flex-col items-center gap-4 py-12 h-full">
                     <div className=" min-w-[155px] min-h-[155px] flex rounded-full relative flex justify-center">
                        <ZoomImage
                           src={methods.watch('user.image') || unknownImage}
                           height={200}
                           width={200}
                           className='border rounded'
                        />
                     </div>
                     <div onClick={() => methods.setValue('imagePickerOpen', true)} className="flex items-center text-xs gap-1 cursor-pointer text-white bg-sky-700 hover:bg-sky-600 rounded-full px-3 py-1.5 w-fit">
                        <FiCamera />
                        <span className="uppercase font-semibold">Editar foto</span>
                     </div>

                     <ImagePicker
                        image={methods.watch("user.image")}
                        setImage={image => methods.setValue('user.image', image)}
                        open={methods.watch('imagePickerOpen')}
                        setOpen={open => methods.setValue('imagePickerOpen', open)}
                        onLoad={() => { }}
                     />
                  </div>
               </div>
            </div>
         </AdminLayout>
      </>
   );
};

export default Account;