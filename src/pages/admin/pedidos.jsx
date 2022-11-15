import Head from 'next/head';
import AdminLayout from '../../components/admin/Layout';

const Pedidos = () => {
  return (
    <>
      <Head>
        <title>Pa&apos; Come Admin | Pedidos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div>Pedidos</div>
      </AdminLayout>
    </>
  );
};

export default Pedidos;