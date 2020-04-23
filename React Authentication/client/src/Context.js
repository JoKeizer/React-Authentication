import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  //If authenticatedUser is null (there is no authenticated user), we'll display the default header. Otherwise, we'll display the user name in the header in a "Welcome" message alongside a "Sign Out" link.
  state = {
    authenticatedUser: null

  }

  //Initialize a new instance of the Data class
  constructor() {
    super();
    this.data = new Data();

  }

// The Provider lives at the top level of the app, and will allow its 
// child components to gain access to context.  
render() {
  //destructuring assignment to extract authenticatedUser from this.state:
  const { authenticatedUser } = this.state;

  //pass the date to value
  //Pass the signIn Function to the Provider
  //Pass state to <Context.Provider> by adding the authenticatedUser variable to the value object:
  const value = {
    authenticatedUser,
    data: this.data,
    actions: { // Add the 'actions' property and object
    signIn: this.signIn
  }
  };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //The signIn function is an asynchronous function that takes a username and password as arguments. 
  // signIn uses those credentials to call the getUser() method in Data.js, which makes a GET request to the protected /users route on the server and returns the user data.

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);

    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
    return user;

  }

  signOut = () => {

  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

// At the bottom of Context.js is a higher-order function named withContext that wraps a provided component in a <Context.Consumer> component. In other words, withContext automatically subscribes (or connects) the component passed to it to all actions and context changes:
// This will come in handy soon when we need to share user authentication data and actions throughout the app
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

