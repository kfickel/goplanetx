import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      readyToPlay: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnChange(e) {
    this.setState({
      playerName: e.target.value,
    }, () => {
      this.props.passBack(this.state.playerName, this.props.player);
    });
  }

  handleOnKeyPress(e) {
    if (e.charCode === 13) {
      this.setState({
        readyToPlay: true,
      });
    }
  }

  render() {
    if (this.state.readyToPlay) {
      return (
        <div className="wins">
          <h3 className="player">{this.props.player} {this.state.playerName}</h3>
          <p>Wins: {this.props.wins}</p>
        </div>
      );
    }
    return (
      <Input
        type="text"
        id="player"
        placeholder="Player Name"
        onChange={this.handleOnChange}
        onKeyPress={this.handleOnKeyPress}
      />
    );
  }
}

Player.propTypes = {
  wins: PropTypes.number.isRequired,
  player: PropTypes.string.isRequired,
  passBack: PropTypes.func.isRequired,
};

export default Player;

