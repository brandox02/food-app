import { gql, useApolloClient } from "@apollo/client";
import { toast } from "react-toastify";
import { useAppContext } from "../AppProvider";
import { setAuthToken } from '../ApolloProvider';
import { useEffect } from "react";
import { useRouter } from "next/router";

const SIGNIN = gql`
  mutation Signin($signin: UserInput!) {
    signin(user: $signin) {
      accessToken
    }
  }
`;

export const useAuth = () => {
  const [_, setState] = useAppContext();
  const client = useApolloClient();
  const router = useRouter()

  useEffect(() => {
    async function execute() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await beAuthenticated(token);
          router.push('/');
          return
        }


      } catch (error) {
        toast.error('Ocurrió un error a la hora de leer tu token de acceso');
        console.error(error);
      }
    }
    execute();

    // eslint-disable-next-line
  }, []);

  const beAuthenticated = async (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token);

    const response = await client.query({
      query: gql`
        query GetUserInfo {
          getUserInfo {
            id
            firstname
            lastname
            enabled
            cedula
            email
            company {
              id location name sede
            }
            department {
              id name
            }
          }
        }
      `});

    setState(state => ({ ...state, user: response.data.getUserInfo }));
  }

  const signin = async (payload) => {

    const response = await client.mutate({ mutation: SIGNIN, variables: { signin: payload } });
    const token = response?.data?.signin.accessToken;
    if (token) {

      await beAuthenticated(token);

    }

  };

  const login = async ({ email, password }) => {

    const LOGIN = gql`
       mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              accessToken
            }
          }
      `
    const response = await client.mutate({
      mutation: LOGIN, variables: { email, password }
    });
    const token = response.data.login.accessToken;
    if (response.data.login.accessToken) {
      await beAuthenticated(token);
    }


  }

  const logout = async () => {
    await client.resetStore();
    localStorage.removeItem('token');
    setState(state => ({ ...state, user: null }));
    router.push('/login');
  }



  return { signin, login, logout };
};
