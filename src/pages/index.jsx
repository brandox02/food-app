import Head from 'next/head';
import { MainGrid } from '../components/customer/home/MainGrid';
import { TodayOrders } from '../components/customer/home/TodayOrders';

export default function Home() {
  return (
    <div className="h-full">
      <Head>
        <title>Pa&apos; Come | Inicio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainGrid />
      <TodayOrders />
    </div>
  );
}
