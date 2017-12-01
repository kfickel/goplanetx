import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      session: this.props.session,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit() {
    this.props.logInUser(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="container login-container">
        <div>
          <PageHeader><small>Admin Login:</small></PageHeader>
          <ControlLabel className="login-username" >
            Username
            <FormControl
              type="text"
              placeholder="username..."
              onChange={this.onUsernameChange}
            />
          </ControlLabel>
          <br />
          <ControlLabel className="login-password">
            Password
            <FormControl
              type="password"
              placeholder="password..."
              onChange={this.onPasswordChange}
            />
          </ControlLabel>
          <br />
          <Button bsStyle="primary" className="login-button" onClick={this.onSubmit}>Log In</Button>
          <br />
        </div>
        <div>
          <PageHeader><small>Don&apos;t have an account? Request one:</small></PageHeader>
          <Button bsStyle="primary" onClick={this.props.showSignUp}>Signup</Button>
        </div>
      </div>
    );
  }
}

AdminLogin.propTypes = {
  logInUser: PropTypes.func.isRequired,
  showSignUp: PropTypes.func.isRequired,
};

export default AdminLogin;
