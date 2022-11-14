import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { AppProvider, useAppContext } from '../AppProvider';
import { ApolloProvider } from '../ApolloProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/customer/layout';

// this component redirect to login if the user not be authenticated
function WithAuth({ children }) {
  const [state] = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const freePaths = ['/login', '/register'];
    if (!freePaths.includes(router.pathname) && !state.user) {
      router.push('/login');
    }
    // eslint-disable-next-line
  }, [router.pathname]);
  return children;
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AppProvider>
      <ToastContainer />
      <ApolloProvider>
        <WithAuth>
          <div className="min-h-screen bg-[#47ADF5]/20">
            <MantineProvider withGlobalStyles withNormalizeCSS>
              {router.pathname.startsWith('/customer/') ||
              router.pathname == '/' ? (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              ) : (
                <Component {...pageProps} />
              )}
            </MantineProvider>
          </div>
        </WithAuth>
      </ApolloProvider>
    </AppProvider>
  );
}

export default MyApp;
