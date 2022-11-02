import '../styles/globals.css';
import Login from './auth/login';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Login />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
