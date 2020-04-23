import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  //Initialize a new instance of the Data class
  constructor() {
    super();
    this.data = new Data();

  }



// The Provider lives at the top level of the app, and will allow its 
// child components to gain access to context.  
render() {
  //pass the date to value
  const value = {
    data: this.data,
  };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async () => {

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

