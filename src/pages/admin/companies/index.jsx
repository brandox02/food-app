import { Group, List, Table, ThemeIcon } from '@mantine/core';
import dayjs from 'dayjs';
import Head from 'next/head';
import { BiSave } from 'react-icons/bi';

import AdminLayout from '../../../components/admin/Layout';
import { FormProvider } from '../../../components/react-hook-form/FormProvider';
import { RHFTextInput } from '../../../components/react-hook-form/RHFTextInput';
import { RHFSelectWithQuery } from '../../../components/react-hook-form/RHFSelectWithQuery';
import { BsFillTrashFill } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useActions } from './useActions';
import { gql } from '@apollo/client';
import { v4 as generateId } from 'uuid';

const Reportes = () => {
   const { isEditing, methods, onSave } = useActions();
   const departments = methods.watch('company')?.departments || [];
   return (
      <>
         <Head>
            <title>Pa&apos; Come Admin | Reportes</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <AdminLayout>
            <div className='flex justify-between items-center'>
               <div className="w-fit">
                  <span className="text-blue-900 text-2xl font-semibold">
                     Empresas
                  </span>
                  <div className="h-[3px] bg-blue-400 self-start rounded-full" />
               </div>
               {isEditing && (
                  <Group className='mt-5 flex justify-end'>
                     <button
                        onClick={() => {
                           methods.reset({
                              company: null,
                              companySelected: null
                           });

                        }}
                        className=" text-white bg-blue-400 hover:bg-blue-300 flex items-center py-1.5 px-4 gap-2 uppercase italic rounded-md"
                     >
                        <AiOutlinePlusCircle />
                        Nueva Empresa
                     </button>
                  </Group>
               )}
            </div>
            <div className="w-full flex flex-col gap-8 mt-10">
               <div className="flex flex-col gap-6">
                  <div id="scrollbar" className="w-auto overflow-auto">
                     <FormProvider methods={methods} onSubmit={onSave}>
                        <span className="font-[poppins] text-sm xl:text-base text-[#003579] font-semibold">
                           Selecciona la empresa que deseas editar o no para crear una nueva
                        </span>
                        <RHFSelectWithQuery
                           name={'companySelected'}
                           getWholeItemValue
                           placeholder='Creando Nueva Empresa'
                           query={gql`
                              query Companies{
                                 items: companyList{
                                    id name sede location acronym departments {
                                       id name
                                    }
                                 }
                              }
                           `} />

                        <div className='flex'>
                           <div className=" mt-6 mr-12">
                              <div className=" lg:col-span-3 w-full mb-5">
                                 <span className="text-blue-900 text-lg font-bold">
                                    Información de la empresa
                                 </span>

                              </div>
                              <div className=" flex flex-col gap-0.5" style={{ width: 350 }}>
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
                                 <RHFTextInput name={'company.acronym'} placeholder='' />
                              </div>
                           </div>
                           <div className='mt-6'>
                              <div className="flex lg:col-span-3 w-full mb-1">
                                 <div className=" lg:col-span-3 w-full mb-5">
                                    <span className="text-blue-900 text-lg font-bold">
                                       Departamentos de la empresa
                                    </span>

                                 </div>
                                 <ThemeIcon
                                    color="cyan"
                                    className=' ml-4'
                                    size={30}
                                    radius="xl"
                                    onClick={() => methods.setValue('company.departments', [...(methods.watch('company.departments') || []), { id: generateId(), name: `Nuevo departamento ${generateId()}` }])}
                                 >
                                    <AiOutlinePlusCircle className='cursor-pointer' size={20} />
                                 </ThemeIcon>

                              </div>

                              <List
                                 className='mt-2'
                                 spacing="xs"
                                 size="sm"
                                 center
                              >
                                 {departments.map((item, index) => (
                                    <List.Item key={item.id} >
                                       <div className='flex no-wrap items-center'>
                                          <ThemeIcon
                                             color="red"
                                             size={25}
                                             radius="xl"
                                             className='mr-2'
                                             onClick={() => methods.setValue(`company.departments`, methods.watch('company.departments').filter(x => x.id !== item.id))}
                                          >
                                             <BsFillTrashFill className='cursor-pointer' size={20} />
                                          </ThemeIcon>
                                          <RHFTextInput style={{ width: 300 }} name={`company.departments[${index}].name`} className='' />
                                       </div>
                                    </List.Item>
                                 ))}

                              </List>
                           </div>
                        </div>

                        <Group className='mt-5 flex justify-end'>
                           <button
                              type='submit'
                              className=" text-white bg-blue-400 hover:bg-blue-300 flex items-center py-1.5 px-4 gap-2 uppercase italic rounded-md"
                           >
                              <BiSave />
                              {isEditing ? 'Editar' : 'Crear'}
                           </button>
                        </Group>
                     </FormProvider>
                  </div>
               </div>
            </div>
         </AdminLayout>
      </>
   );
};

export default Reportes;