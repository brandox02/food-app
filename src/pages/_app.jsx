import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Navbar } from "../components/customer/Navbar";
import { Footer } from "../components/customer/Footer";
import { AppProvider, useAppContext } from "../AppProvider";
import { ApolloProvider } from "../ApolloProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// this component redirect to login if the user not be authenticated
function WithAuth ({children})  {
  const [state] = useAppContext();
  const router = useRouter();

  useEffect(() => {
    
    const freePaths = ['/login', '/register'];
    if(!freePaths.includes(router.pathname) && !state.user){

      router.push('/login');
      
    }
  // eslint-disable-next-line
  }, [router.pathname]);
  return children

}

function MyApp({ Component, pageProps }) {


 

  return (
    <AppProvider>
     <ToastContainer />
      <ApolloProvider>
        <WithAuth>
          <div className="min-h-screen bg-[#47ADF5]/20">
            <MantineProvider withGlobalStyles withNormalizeCSS>
            
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </MantineProvider>
          </div>
        </WithAuth>
      </ApolloProvider>
  
    </AppProvider>
  );
}

export default MyApp;
