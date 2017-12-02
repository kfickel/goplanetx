import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import SkyLight from 'react-skylight';
import { Board } from './board';
import Player from './player';
import Computer from './computer';

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
      return { player: squares[a], line: i };
    }
  }
  return { player: null, line: null };
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
      player1wins: 0,
      player2wins: 0,
      gameInPlay: true,
    };

    this.onReset = this.onReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      gameInPlay: true,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (!this.state.gameInPlay || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? '╳' : '◯';
    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    }, () => {
      const winner = calculateWinner(squares);
      if (winner.player === '╳') {
        this.setState({
          player1wins: this.state.player1wins + 1,
          gameInPlay: false,
        });
      } else if (winner.player === '◯') {
        this.setState({
          player2wins: this.state.player2wins + 1,
          gameInPlay: false,
        });
      }
    });
  }

  handleHover() {
    console.log('hover!');
    return (<div> HOVER </div>);
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
    if (winner.player) {
      status = `Winner: ${winner.player}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? '╳' : '◯'}`;
    }

    return (
      <Container>
        <Row>
          <Col sm={3}>
            <Player player="╳" wins={this.state.player1wins} />
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
                  line={winner.line}
                />
                <span>
                  <button id="reset" onClick={this.onReset}>reset</button>
                  <div
                    id="info-button"
                    role="button"
                    tabIndex={0}
                    onClick={() => this.simpleDialog.show()}
                  >
                    <img id="info" src="images/info.png" alt="info" />
                  </div>
                  <SkyLight
                    hideOnOverlayClicked
                    ref={(ref) => { this.simpleDialog = ref; }}
                    title="How To Play"
                  >
                    <div>The object of Tic Tac Toe is to get three in a row.
                    The first player is known as X and the second is O.
                    Players alternate placing Xs and Os on the game board until
                    either oppent has three in a row or all nine squares are filled.
                    In the event that no one has three in a row, the stalemate is called a cat game.
                    </div>
                    <div id="overlay-bug">
                      <div>Did you find a bug?</div>
                      <a href="#login-here">
                        <button
                          onClick={() => { this.props.showLogIn(); this.simpleDialog.hide(); }}
                        >
                        Report it here.
                        </button>
                      </a>
                    </div>
                  </SkyLight>
                </span>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            {this.props.twoPlayers ? (<Player player="◯" wins={this.state.player2wins} />)
            : (<Computer wins={this.state.player2wins} />)}
          </Col>
        </Row>
      </Container>
    );
  }
}

Game.propTypes = {
  unlockForms: PropTypes.func,
  twoPlayers: PropTypes.bool,
  showLogIn: PropTypes.func,
};

Game.defaultProps = {
  unlockForms: () => {},
  twoPlayers: true,
  showLogIn: () => {},
};

export default Game;
