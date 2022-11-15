import {ApolloProvider as ApolloProviderSource, createHttpLink,ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: `http://localhost:3000/graphql`,
  cache: new InMemoryCache({addTypename: false}),
  
})

export const setAuthToken = (token) => {
  apolloClient.setLink( createHttpLink({
    uri: 'http://localhost:3000/graphql',
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