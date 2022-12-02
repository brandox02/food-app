import {ApolloProvider as ApolloProviderSource, createHttpLink,ApolloClient, InMemoryCache } from '@apollo/client'
const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  cache: new InMemoryCache({addTypename: false}),
  
});

export const setAuthToken = (token) => {
  apolloClient.setLink( createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
    headers: {
      'authorization': `Bearer ${token}`
    },
    
  }));
}

export function ApolloProvider({children}){
   
   return <ApolloProviderSource client={apolloClient}>
     {children}
   </ApolloProviderSource>
 }