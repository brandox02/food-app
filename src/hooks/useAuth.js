import { gql, useApolloClient } from "@apollo/client";
import { toast } from "react-toastify";
import { useAppContext } from "../AppProvider";
import { setAuthToken } from '../ApolloProvider';
import { useEffect } from "react";
import { useRouter } from "next/router";

const SIGNIN = gql`
  mutation Signin($signin: CreateUserInput!) {
    signin(user: $signin) {
      accessToken
    }
  }
`;

const LOGIN = gql`
       mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              accessToken
            }
          }
      `

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
            role { id name }
            company {
              id location name sede
            }
            department {
              id name
            }
          }

          generalParameters: generalParameterList {
            id name value
          }
        }
      `});

    setState(state => ({ ...state, user: response.data.getUserInfo, generalParameters: response.data.generalParameters }));
  }

  const signin = async (payload) => {

    await client.mutate({ mutation: SIGNIN, variables: { signin: payload } });
    toast.success('Usuario registrado. Para poder iniciar sesión debes ser activado por un administrador');
    // const token = response?.data?.signin.accessToken;
    // if (token) {

    //   await beAuthenticated(token);

    // }
    router.push('/login');
  };

  const login = async ({ email, password }) => {

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
