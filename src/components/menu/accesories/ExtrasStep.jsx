import { Radio } from '@mantine/core';
import React from 'react';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { CgMathMinus } from 'react-icons/cg';
import { Controller, useFormContext } from 'react-hook-form';
import unknownFoodImage from '../../../../public/assets/unknown-food.jpg';
import { ZoomImage } from './ZoomImage';

export function ProductPickerType1({ item }) {
  const { setValue } = useFormContext();
  const concatName = (name) => `extrasStep.${item.id}.${name}`;

  function onClick({ id, value }) {
    if (value < 0) return;
    setValue(concatName(id), value);
  }
  return (
    <div className="flex flex-col gap-2">
      <span className="text-orange-400 font-semibold">{item.header.name}</span>
      <div>
        {item.items.map((product) => {
          return (
            <Controller
              key={product.id}
              name={concatName(product.id)}
              render={({ field }) => {
                const quantity = field.value || 0;
                return (
                  <div
                    key={product.id}
                    className="flex flex-row my-3 items-center"
                  >
                    <ZoomImage
                      className="rounded mr-2"
                      src={
                        product?.imageUrl ? product.imageUrl : unknownFoodImage
                      }
                      alt={'img'}
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col ml-2">
                      <span className="text-base">{product.name}</span>
                      <span className="font-semibold">RD${product.price}</span>
                      <div className="flex flex-row justify-around my-2">
                        <div
                          className="p-1.5 bg-orange-400 rounded-full active:scale-95 cursor-pointer"
                          onClick={() =>
                            onClick({ id: product.id, value: quantity - 1 })
                          }
                        >
                          <CgMathMinus className="text-white" />
                        </div>
                        <span className="mx-2">{quantity}</span>
                        <div
                          className="p-1.5 bg-orange-400 rounded-full active:scale-95 cursor-pointer"
                          onClick={() =>
                            onClick({ id: product.id, value: quantity + 1 })
                          }
                        >
                          <FiPlus className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ProductPickerType2({ item }) {
  const { setValue, watch } = useFormContext();
  const concatFlavorName = () => `extrasStep.${item.id}.flavor`;
  const concatSizeName = (name) => `extrasStep.${item.id}.size.${name}`;

  const onClick = ({ value, id }) => {
    if (value < 0) return;
    setValue(concatSizeName(id), value);
  };
  const onChange = (value) => setValue(concatFlavorName(), value);
  const disabled = Object.values(
    watch(`extrasStep.${item.id}.size`) || {}
  ).every((x) => !x);
  console.log({ item });
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-orange-400 font-semibold">
          {item.header.name}
        </span>
        <ZoomImage
          className="rounded my-2 "
          src={item.header?.imageUrl ? item.header.imageUrl : unknownFoodImage}
          alt={'img'}
          width={100}
          height={100}
        />
        <span className="text-sm font-semibold text-blue-900">Tamaño</span>
        {item.sizes.map((size) => (
          <Controller
            name={concatSizeName(size.id)}
            key={size.id}
            render={({ field }) => {
              const quantity = field.value || 0;
              return (
                <div className="flex justify-between w-full max-w-[300px]">
                  <div>
                    {size.name}{' '}
                    <span className="font-semibold">RD${size.price}</span>
                  </div>
                  <div
                    className="p-1.5 cursor-pointer bg-orange-400 rounded-full active:scale-95"
                    onClick={() =>
                      onClick({ id: size.id, value: quantity - 1 })
                    }
                  >
                    <CgMathMinus className="text-white" />
                  </div>
                  <span>{quantity}</span>
                  <div
                    className="p-1.5 cursor-pointer bg-orange-400 rounded-full active:scale-95"
                    onClick={() =>
                      onClick({ id: size.id, value: quantity + 1 })
                    }
                  >
                    <FiPlus className="text-white" />
                  </div>
                </div>
              );
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-blue-900">{'Sabores'}</span>
        <Controller
          name={concatFlavorName()}
          render={({ field }) => {
            return (
              <Radio.Group
                className="pl-5"
                name={concatFlavorName()}
                orientation="vertical"
                spacing="xs"
                value={field.value}
                onChange={onChange}
              >
                {item.flavors.map((flavor) => (
                  <div key={flavor.id} className="flex text-sm gap-1">
                    <Radio
                      value={flavor.id}
                      label={flavor.name}
                      disabled={disabled}
                    />
                  </div>
                ))}
              </Radio.Group>
            );
          }}
        />
      </div>
    </>
  );
}

export const ExtrasStep = ({ goBack, items, typeId }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="px-5">
        <div className="w-full lg:max-w-[850px] relative mx-auto bg-white rounded-sm shadow flex flex-col px-6 md:px-14 py-8 gap-8">
          {typeId === 1 && (
            <div className=" text-center flex flex-col font-[poppins] text-[#1A579A]">
              <div className="md:absolute flex w-full md:justify-start justify-center lg:-ml-8 md:-mt-4 mb-2 md:mb-0">
                <div
                  className=" bg-blue-300 rounded-full p-2 cursor-pointer"
                  onClick={goBack}
                >
                  <FiArrowLeft className="text-white w-5 h-5" />
                </div>
              </div>
              <span>Antes de terminar, ¿Deseas agregar un adicional?</span>
              <span className="text-gray-400">
                Recuerda que el total del extra se te sumará al monto del plato
                del día.
              </span>
            </div>
          )}
          <div className="flex flex-col w-full font-[poppins]">
            <div className="w-full flex items-end justify-between">
              <span className="text-2xl text-[#1A579A] font-semibold italic pl-2">
                {typeId === 1 ? 'Extras' : 'Menú'}
              </span>
              <span className="text-xs text-gray-400 italic">
                Selecciona lo que desees
              </span>
            </div>
            <div className="h-[3px] w-full bg-orange-400 self-start rounded-full"></div>
          </div>
          {items.length ? (
            <div className="flex flex-col gap-6 italic px-10 lg:px-20 font-[poppins]">
              {items.map((item) => {
                switch (item.fieldsetTypeId) {
                  case 1:
                    return <ProductPickerType1 item={item} key={item.id} />;
                  case 2:
                    return <ProductPickerType2 item={item} key={item.id} />;
                  default:
                    return '';
                }
              })}
            </div>
          ) : (
            <div>No hay extras en estos momentos</div>
          )}
          <div className="flex justify-center mt-8 px-10 md:px-24">
            <button
              type="submit"
              onClick={() => {}}
              className="p-5 bg-[#0064CE] rounded-lg py-2 hover:bg-blue-600 text-white uppercase font-semibold w-full"
            >
              Ver Resumen de Orden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
