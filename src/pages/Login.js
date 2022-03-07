import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      name: '',
      loading: false,
      redirect: false,
    };
  }

  /* createUser:  {
  name: '',
  email: '',
  image: '',
  description: '',
}
 */
  checkName = (event) => {
    const minName = 3;
    const nameLength = event.target.value.length;
    // console.log(nameLength);
    this.setState({
      disabled: nameLength < minName,
      name: event.target.value,
    });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      name: '',
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { disabled, loading, redirect } = this.state;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login">
        <form>
          <input data-testid="login-name-input" onChange={ this.checkName } />

          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
