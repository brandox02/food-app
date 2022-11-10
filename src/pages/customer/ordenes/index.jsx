import { Anchor, Breadcrumbs, Tooltip } from '@mantine/core';
import Head from 'next/head';
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { OrderCard } from '../../../components/customer/home/OrderCard';
import { TodayOrders } from '../../../components/customer/home/TodayOrders';

const Ordenes = () => {
  const items = [
    { title: <FiHome />, href: '/' },
    { title: 'Ordenes', href: '/customer/ordenes' },
  ].map((item, index) => (
    <Anchor
      className="text-[#003579] font-semibold italic"
      href={item.href}
      key={index}
    >
      {item.title}
    </Anchor>
  ));
  return (
    <div className="w-full flex flex-col gap-6">
      <Head>
        <title>Pa&apos; Come | Ordenes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-[1750px] mx-auto lg:px-24 px-5">
        <Breadcrumbs separator=">">{items}</Breadcrumbs>
      </div>
      <div className="w-full flex flex-col gap-5 max-w-[1750px] bg-white mx-auto px-10 lg:px-24 py-8">
        <div className=" w-fit">
          <span className="text-blue-900 text-2xl font-semibold">
            Pendientes
          </span>
          <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-10">
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
      <TodayOrders />
    </div>
  );
};

export default Ordenes;
