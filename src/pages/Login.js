import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
    };
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-login">
        <input data-testid="login-name-input" />

        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ disabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
