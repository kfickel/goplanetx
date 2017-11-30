import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

function UserEntry({ user }) {
  const setAccountType = function setAccountTypeForUserId(id, accountType) {
    $.ajax({
      url: '/users',
      method: 'PATCH',
      data: { id, account_type: accountType },
    });
  };

  return (
    <div className="user-entry">
      <b>Username: </b>{user.username}
      <br />
      <b>Name: </b>{`${user.first_name} ${user.last_name}`}
      <div className="account-type">
        <label htmlFor="user-radio">
          &nbsp;User&nbsp;
          <input
            type="radio"
            className="user-radio"
            name={user.id}
            value="user"
            defaultChecked={user.account_type === 'user'}
            onChange={() => setAccountType(user.id, 'user')}
          />
        </label>
        <label htmlFor="responder-radio">
          &nbsp;Responder&nbsp;
          <input
            type="radio"
            className="responder-radio"
            name={user.id}
            value="responder"
            defaultChecked={user.account_type === 'responder'}
            onChange={() => setAccountType(user.id, 'responder')}
          />
        </label>
        <label htmlFor="admin-radio">
          &nbsp;Admin&nbsp;
          <input
            type="radio"
            className="admin-radio"
            name={user.id}
            value="admin"
            defaultChecked={user.account_type === 'admin'}
            onChange={() => setAccountType(user.id, 'admin')}
          />
        </label>
      </div>
    </div>
  );
}

UserEntry.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    account_type: PropTypes.string,
  }).isRequired,
};

export default UserEntry;
