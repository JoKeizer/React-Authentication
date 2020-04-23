import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  //Destructure props we take context from props and name, username and password from state. 

  submit = () => {
    const { context } = this.props;

    const {
      name,
      username,
      password,
    } = this.state;

    //Initialize a variable named user to an object whose properties are name, user and password:
    // New user payload
    const user = {
      name,
      username,
      password,
    };

    // Create user
    //To create a new user, call the createUser() method, which you can access via the destructured context variable. Context itself is an object which currently has only one property, data. Earlier, in Context.js, you passed Context.Provider a value prop whose value was an object with a data property. The authentication API utilities provided to app are available via the context.data property.
    context.data.createUser(user)
    //In the then() method, we'll check if the returned PromiseValue is an array of errors. If it is, we will set the errors state of the UserSignUp class to the returned errors.
    .then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        console.log(`${username} is successfully signed up and authenticated!`);
      }
    })

    //A catch() method chained to the promise sequence handles a rejected promise returned by createUser(). For example, if there's an issue with the /users endpoint, the API is down, or there's a network connectivity issue, the function passed to catch() will get called.
    .catch( err => {
      console.log(err)
      //In the event of an error, we will change the current URL from /signup to /error. In other words, redirect the user to another route. Navigating to the /error route will display a "Not Found" message in the browser, providing a user-friendly way to let users know that something went wrong.
      this.props.hisrory('/error')
    })
    // createUser() is an asynchronous operation that returns a promise. The resolved value of the promise is either an array of errors (sent from the API if the response is 400), or an empty array (if the response is 201).
  }

  cancel = () => {
    //To accomplish the redirect, we'll once again use history. In the body of the cancel function push the root path ('/') onto the history stack:
    this.props.history.push('/');
  }
}
