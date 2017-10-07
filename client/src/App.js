import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'

import WhoAmI from './WhoAmI/index'
import Layout from "./Layout/index"
import LogIn from './Authentication/LogIn'
import SignUp from './Authentication/SignUp'
import LogOut from "./Authentication/LogOut"
import PostsIndex from "./Posts"

const networkInterface = createNetworkInterface({
  uri: "/graphql",
})

// See http://dev.apollodata.com/react/auth.html#Header for explanation
// Note: using SessionStorage instead of LocalStorage for the token
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from session storage if it exists
    const token = window.sessionStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout>
            <Route exact path="/" component={WhoAmI}/>
            <Route exact path="/login" component={LogIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/logout" component={LogOut}/>
            <Route exact path="/posts" component={PostsIndex}/>
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
