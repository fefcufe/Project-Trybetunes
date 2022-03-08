import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState({
      loading: true,
    });

    const userInfo = await getUser();
    this.setState({
      loading: false,
      name: userInfo.name,
    });
    return userInfo;
  }

  render() {
    const { loading, name } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name"><strong>{ name }</strong></p>
      </header>
    );
  }
}

export default Header;
