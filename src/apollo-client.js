import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'


const accessToken = '';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql'
});

const middlewareLink = setContext(() => ({
  headers: {
    authorization: `bearer ${accessToken}`
  }
}));

const link = middlewareLink.concat(httpLink);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

export { apolloClient };


