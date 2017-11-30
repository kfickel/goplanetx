import React from 'react';
import PropTypes from 'prop-types';

function UserEntry({ user: { username } }) {
  return (
    <div className="user-entry">
      {username}
    </div>
  );
}

UserEntry.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

export default UserEntry;
