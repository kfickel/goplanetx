import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';

import UserEntry from './userEntry';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchString: '',
    };

    this.getUsers();

    this.updateSearchString = this.updateSearchString.bind(this);
  }

  getUsers() {
    return $.get('/users')
      .then(users => this.setState({ users }));
  }

  updateSearchString(e) {
    this.setState({ searchString: e.target.value });
  }

  render() {
    return (
      <div id="users">
        <div id="users-header">
          <h2>All Users</h2>
          <input
            type="text"
            id="user-search"
            placeholder="User Search"
            onChange={this.updateSearchString}
          />
        </div>
        <ReactCSSTransitionGroup
          transitionName="users-entry"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.state.users.map((user) => {
            const matchStr = new RegExp(this.state.searchString.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
            if (
              this.state.searchString === ''
              || matchStr.test(user.username)
              || matchStr.test(`${user.first_name} ${user.last_name}`)
            ) {
              return <UserEntry user={user} key={user.id} />;
            }
            return '';
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Users;
