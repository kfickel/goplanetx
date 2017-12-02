import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import { Jumbotron } from 'reactstrap';
import Game from './components/user/tictactoeView/game';
import Login from './components/user/formView/login';
import Signup from './components/user/formView/signup';
import Submission from './components/user/formView/submission';
import AdminView from './components/admin/adminView';
import UserResponses from './components/user/formView/userResponses';
import AdminLogin from './components/user/formView/adminLogin';
import Users from './components/admin/users';
import AdminNavigation from './components/admin/adminNavigation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      type: '',
      // showForms: false,
      // Possible view values:
      // restricted: only render game
      // unrestricted: render game, login and signup buttons (after user has clicked button 10x)
      // login: render login component (if user clicks on login button)
      // signup: render signup component (if user clicks on signup
      // button OR creates an account, will be redirected)
      // submissions: render sumbissions component (if user is successfully logged in)
      view: 'restricted',
      showBugButton: false,
      twoPlayers: true,
    };

    this.unlockForms = this.unlockForms.bind(this);
    this.onEsc = this.onEsc.bind(this);
    this.hideBugButton = this.hideBugButton.bind(this);
    this.showAdminResponses = this.showAdminResponses.bind(this);
    this.showSubmissionForm = this.showSubmissionForm.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.showLogIn = this.showLogIn.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.createUser = this.createUser.bind(this);
    this.retrieveMessages = this.retrieveMessages.bind(this);
    this.retrieveResponses = this.retrieveResponses.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.onLogoutUser = this.onLogoutUser.bind(this);
    this.playFriend = this.playFriend.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc, false);
  }

  onEsc(e) {
    if (e.keyCode === 27) {
      this.setState({ view: 'restricted' });
    }
  }

  onLogoutUser() {
    this.setState({ view: 'restricted' });
  }

  createUser(username, hash, firstName, lastName) {
    $.ajax({
      method: 'POST',
      url: '/signup',
      data: {
        username,
        hash,
        salt: '',
        account_type: 'user',
        first_name: firstName,
        last_name: lastName,
        email: '',
      },
      success: () => {
        alert('You have successfully created an account');
        this.setState({
          view: 'login',
        });
      },
      error: (error) => {
        console.log(error);
        alert('Woops, looks like that username is already taken!');
        this.setState({
          view: 'signUp',
        });
      },
    });
  }

  logInUser(username, hash) {
    $.ajax({
      method: 'POST',
      url: '/login',
      data: {
        username,
        hash,
      },
      success: (data) => {
        this.setState({
          view: 'submission',
          username: data.username,
          type: data.account_type,
        }, () => {
          if (this.state.type === 'admin' || this.state.type === 'responder') {
            this.props.history.push('/admin/messages');
            window.sessionStorage.setItem('type', this.state.type);
            window.sessionStorage.setItem('user', this.state.username);
          } else if (this.state.type === 'user') {
            this.props.history.push('/');
          }
        });
      },
      error: (error) => {
        alert('Incorrect password');
        console.log('Unsuccessful login with error: ', error);
      },
    });
  }

  sendMessage(contact, urgency, message) {
    $.ajax({
      method: 'POST',
      url: '/submissions',
      data: {
        username: this.state.username,
        user_contact: contact,
        user_urgency: urgency,
        user_message: message,
      },
      success: (data) => {
        alert('Your message was sent succesfully. Check back often for status updates.');
      },
      error: (error) => {
        console.log('Error sending message with', error);
      },
    });
  }

  retrieveResponses(callback) {
    $.ajax({
      method: 'GET',
      url: `/submissions?username=${this.state.username}&account_type=null`,
      success: (data) => {
        callback(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  retrieveMessages(callback) {
    if (window.sessionStorage.getItem('type') !== '') {
      this.setState({
        username: window.sessionStorage.getItem('user'),
        type: window.sessionStorage.getItem('type'),
      });
    }
    $.ajax({
      method: 'GET',
      url: `/submissions?username=${this.state.username || window.sessionStorage.getItem('user')}&account_type=${this.state.type || window.sessionStorage.getItem('type')}`,
      success: (data) => {
        callback(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  hideBugButton() {
    this.setState({
      showBugButton: false,
    });
  }

  showLogIn() {
    window.sessionStorage.setItem('type', '');
    window.sessionStorage.setItem('user', '');
    if (this.state.type !== 'admin') {
      this.setState({
        view: 'login',
        showBugButton: false,
      });
    } else {
      this.setState({
        view: 'login',
        showBugButton: false,
      }, () => {
        this.props.history.push('/admin');
      });
    }
  }

  showAdminLogIn() {
    this.setState({
      view: 'adminLogin',
    });
  }

  showSignUp() {
    this.setState({
      view: 'signup',
    }, () => {
      this.props.history.push('/');
    });
  }

  showAdminResponses() {
    this.setState({
      view: 'responses',
    });
  }

  showSubmissionForm() {
    this.setState({
      view: 'submission',
    });
  }

  unlockForms() {
    this.setState({ showBugButton: true });
  }

  playFriend() {
    this.setState({ twoPlayers: !this.state.twoPlayers });
  }

  conditionalRender() {
    if (this.state.showBugButton === true) {
      return (
        <div>
          <Jumbotron>
            <h1 bsclass="jumbotron" className="main-title">Tic Tac Toe</h1>
            <p>
              <Button
                bsStyle="primary"
                onClick={this.playFriend}
              >
                {this.state.twoPlayers ? 'Play Computer' : 'Play a Friend'}
              </Button>
            </p>
          </Jumbotron>
          <Game />
          <br />
          <div className="report-bug-message">
            <p>It looks like you&apos;ve found a bug.  Would you like to report it?</p>
            <Button
              className="bug-button"
              bsSize="xsmall"
              bsStyle="primary"
              onClick={this.showLogIn}
            >
              yes
            </Button>
            <Button
              className="bug-button"
              bsSize="xsmall"
              bsStyle="primary"
              onClick={this.hideBugButton}
            >
              no
            </Button>
          </div>
        </div>
      );
    } else if (this.state.view === 'login') {
      return (
        <div>
          <Jumbotron>
            <h1 bsclass="jumbotron" className="main-title">Tic Tac Toe</h1>
          </Jumbotron>
          <Game />
          <div>
            <Login logInUser={this.logInUser} showSignUp={this.showSignUp} />
          </div>
        </div>
      );
    } else if (this.state.view === 'signup') {
      return (
        <div>
          <Jumbotron>
            <h1 bsclass="jumbotron" className="main-title">Tic Tac Toe</h1>
            <p>
              <Button
                bsStyle="primary"
                onClick={this.playFriend}
              >
                {this.state.twoPlayers ? 'Play Computer' : 'Play a Friend'}
              </Button>
            </p>
          </Jumbotron>
          <Game />
          <div>
            <Signup createUser={this.createUser} showLogIn={this.showLogIn} />
          </div>
        </div>
      );
    } else if (this.state.view === 'submission') {
      return (
        <div>
          <Jumbotron>
            <h1 bsclass="jumbotron" className="main-title">Tic Tac Toe</h1>
            <p>
              <Button
                bsStyle="primary"
                onClick={this.playFriend}
              >
                {this.state.twoPlayers ? 'Play Computer' : 'Play a Friend'}
              </Button>
            </p>
          </Jumbotron>
          <Game twoPlayers={this.state.twoPlayers} />
          <div>
            <Submission
              sendMessage={this.sendMessage}
              showAdminResponses={this.showAdminResponses}
              onLogoutUser={this.onLogoutUser}
            />
          </div>
        </div>
      );
    } else if (this.state.view === 'responses') {
      return (
        <div>
          <Jumbotron>
            <h1 bsclass="jumbotron" className="main-title">Tic Tac Toe</h1>
            <p>
              <Button
                bsStyle="primary"
                onClick={this.playFriend}
              >
                {this.state.twoPlayers ? 'Play Computer' : 'Play a Friend'}
              </Button>
            </p>
          </Jumbotron>
          <Game twoPlayers={this.state.twoPlayers} />
          <div>
            <UserResponses
              showSubmissionForm={this.showSubmissionForm}
              retrieveResponses={this.retrieveResponses}
              onLogoutUser={this.onLogoutUser}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Jumbotron>
          <h1 bsclass="jumbotron" className="main-title">Tic Tac Toe</h1>
          <p>
            <Button
              bsStyle="primary"
              onClick={this.playFriend}
            >
              {this.state.twoPlayers ? 'Play Computer' : 'Play a Friend'}
            </Button>
          </p>
        </Jumbotron>
        <Game
          twoPlayers={this.state.twoPlayers}
          unlockForms={this.unlockForms}
          showLogIn={this.showLogIn}
        />
      </div>
    );
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={this.conditionalRender} />
        <Route
          exact
          path="/admin"
          render={() => (window.sessionStorage.getItem('type') === 'admin' || window.sessionStorage.getItem('type') === 'responder' ? <Redirect to="/admin/messages" /> : (
            <AdminLogin showSignUp={this.showSignUp} logInUser={this.logInUser} />
          ))}
        />
        <Route
          path="/admin/messages"
          render={() => (window.sessionStorage.getItem('type') === '' ? <Redirect to="/admin" /> : (
            <div id="admin">
              {this.state.type === 'admin' ? <AdminNavigation /> : null}
              <AdminView
                showLogIn={this.showLogIn}
                retrieveMessages={this.retrieveMessages}
                username={this.state.username}
              />
            </div>
          ))}
        />
        <Route
          path="/admin/users"
          render={() => (window.sessionStorage.getItem('type') === '' ? <Redirect to="/admin" /> : (
            <div id="admin">
              <AdminNavigation />
              <Users />
            </div>
          ))}
        />
      </Switch>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(App);
