import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Input } from 'reactstrap';
import { Board } from './board';
import Player from './player';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };

    this.onReset = this.onReset.bind(this);
  }

  onReset() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <Container>
        <Row>
          <Col sm={3}>
            <Player />
          </Col>
          <Col md={6}>
            <div className="game">
              <div className="game-board">
                <div className="game-info">
                  <div>{status}</div>
                </div>
                <Board
                  squares={current.squares}
                  onClick={i => this.handleClick(i)}
                  unlockForms={this.props.unlockForms}
                />
                <span><button onClick={this.onReset}>reset</button></span>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            {this.props.twoPlayers ?
              (<Player />)
              : (
                <div className="wins">
                  <h3 className="player">Computer</h3>
                  <p>Wins: 0</p>
                </div>)}
          </Col>
        </Row>
      </Container>
    );
  }
}

Game.propTypes = {
  unlockForms: PropTypes.func,
  twoPlayers: PropTypes.bool.isRequired,
};

Game.defaultProps = {
  unlockForms: () => {},
};

export default Game;
