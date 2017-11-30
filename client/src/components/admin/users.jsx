import React from 'react';
import $ from 'jquery';

import UserEntry from './userEntry';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    this.getUsers();
  }

  getUsers() {
    return $.get('/users')
      .then(users => this.setState({ users }));
  }

  render() {
    return this.state.users.map(user => <UserEntry user={user} key={user.id} />);
  }
}

export default Users;
