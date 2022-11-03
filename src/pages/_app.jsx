import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { Navbar } from '../components/customer/Navbar';
import { Footer } from '../components/customer/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-[#47ADF5]/20">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </MantineProvider>
    </div>
  );
}

export default MyApp;
