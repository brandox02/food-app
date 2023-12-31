import Image from 'next/image';
import Link from 'next/link';
import image404 from '../../public/assets/404.svg';
import Head from 'next/head';

const Error404 = () => {
  return (
    <div className="flex flex-col px-10 py-3 max-w-[1750px] mx-auto justify-center min-h-screen h-full">
      <Head>
        <title>Pa&apos; Come | Error 404</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-5 lg:flex-row xl:mx-44 md:mx-10 animate-fade">
        <div className="flex flex-col items-center justify-center w-full gap-4 lg:items-start">
          <h1 className="font-bold text-8xl text-[#ee2a24]">404</h1>
          <span className="text-4xl font-bold text-center text-[#003579] lg:text-start lg:text-5xl">
            La página que estás buscando no existe.
          </span>
          <Link href="/">
            <button className="mt-5 px-8 py-3.5 border-2 border-[#003579] rounded-full transition-all duration-200 text-white bg-[#003579] font-bold uppercase hover:bg-white hover:text-[#003579]">
              Regresar al Inicio
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full lg:justify-end">
          <Image src={image404} width={400} height={400} alt={'logo'} />
        </div>
      </div>
    </div>
  );
};

export default Error404;
