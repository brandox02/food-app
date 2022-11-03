import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { Navbar } from '../components/customer/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-[#47ADF5]/20">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </div>
  );
}

export default MyApp;
