import config from './config';

export default class Data {

  // The first method in the class, api(), is used to make the GET and POST requests to the REST API. 
  // It currently accepts an API endpoint as its first argument (path), followed by the HTTP method,
  // and body, which will contain any data associated with the request.
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // The url constant configures the request path using the base URL defined in config.js, which gets passed to the returned fetch() method.
    const url = config.apiBaseUrl + path;
  
    // The options object, for example, sends a request with the HTTP method, as well as the request headers and a stringified body (if body is provided).
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

      // Check if auth is required
    if (requiresAuth) {    

      //Encode User Credentials
      //In the Basic auth scheme, a server requests authentication information (a user ID and password) from a client. The client passes the authentication information to the server in an Authorization header using base-64 encoding.
      //The btoa() method creates a base-64 encoded ASCII string from a "string" of data. We'll use btoa() to encode the username and password credentials passed to the api() method. The credentials will be passed as an object containing username and password properties.
      
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      //SET TO HEADER
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;


    }

    // fetch() accepts an optional second parameter: a configuration object that lets you control a number of different settings you can apply to the request.
    return fetch(url, options);
  }

  // The getUser() and createUser() methods perform the async operations 
  // that create and get an authenticated user of our app, using the api() method.

  async getUser(username, password) { // add new parameters

    //Set requiresAuth to true and credentials should be an object containing the username and password information passed to getUser:
    const response = await this.api(`/users`, 'GET', null, true, { username, password });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
