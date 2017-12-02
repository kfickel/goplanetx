import React from 'react';
import PropTypes from 'prop-types';

class Computer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="wins">
        <h3 className="player">Computer</h3>
        <p>Wins: {this.props.wins}</p>
      </div>
    );
  }
}

Computer.propTypes = {
  wins: PropTypes.number.isRequired,
};

export default Computer;
