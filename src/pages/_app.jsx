import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { AppProvider, useAppContext } from "../AppProvider";
import { ApolloProvider } from "../ApolloProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/customer/layout';
import { useAuth } from "../hooks/useAuth";
import dayjs from 'dayjs';

// this component redirect to login if the user not be authenticated
function WithAuth({ children }) {
  const router = useRouter();
  const [{ user }] = useAppContext();
  const { beAuthenticated, oass } = useAuth();

  useEffect(() => {
    async function execute() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await beAuthenticated(token);
          // router.push('/');
        }
        else {
          router.push('/login');
        }
      } catch (error) {
        toast.error('Ocurrió un error a la hora de leer tu token de acceso');
        console.error(error);
        router.push('/login');
      }
    }
    execute();

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   window.dayjs = dayjs;
  //   const freePaths = ['/login', '/register'];
  //   if (!freePaths.includes(router.pathname) && !user) {
  //     router.push('/login');
  //   }
  //   // eslint-disable-next-line
  // }, [router.pathname]);

  if (['/login', '/register'].includes(router.pathname)) {
    return children;
  }


  if (oass) {

    return children;
  }
  return ''

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
