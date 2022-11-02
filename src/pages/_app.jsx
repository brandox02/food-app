import '../styles/globals.css';
import Login from './auth/login';
import Register from './auth/register';
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        {/* <Login /> */}
        {/* <Register /> */}
        <Component {...pageProps} />
      </MantineProvider>
    </div>
  );
}

export default MyApp;
