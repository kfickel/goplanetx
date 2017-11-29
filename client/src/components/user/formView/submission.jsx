import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import UserResponses from './userResponses';


class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: '',
      urgency: '',
      message: '',
    };
    this.updateUrgency = this.updateUrgency.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /* ================================ */
  /* Update state based on user input */
  /* ================================ */
  // updateFirst(e) {
  //   this.setState({
  //     first: e.target.value
  //   });
  // }

  // updateLast(e) {
  //   this.setState({
  //     last: e.target.value
  //   });
  // }

  updateContact(e) {
    this.setState({
      contact: e.target.value,
    });
  }

  updateUrgency(e) {
    this.setState({
      urgency: e.target.value,
    });
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }

  /* ===========================*/

  // on submission, call method to send form data to server
  onSubmit() {
    this.props.sendMessage(
      this.props.username,
      this.state.contact,
      this.state.urgency,
      this.state.message,
    );
  }

  render() {
    return (
      <div className="user-submission-main">

        <PageHeader>Submission Form</PageHeader>
        <h5>Use this form to submit a bug or to respond to an admin's request for additional information.</h5>
        <Button bsStyle="primary" className="change-view-button" onClick={this.props.showAdminResponses}>View Correspondence</Button>


        <div className="user-submission-container">
          <ControlLabel className="contact-info">How can we contact you?</ControlLabel>
          <br></br>
          <FormControl componentClass="textarea" onChange={this.updateContact}type="text" placeholder="contact information"></FormControl>
          <br></br>

          <div>
            <ControlLabel>Please rank the urgency of this bug on a scale of 1 through 5, where 1 is the least urgent, and 5 indicates that the bug is of immediate urgency.</ControlLabel>
            <br></br>
            <span>1</span>
            <input onClick={this.updateUrgency} name="urgency" type="radio" value="1"></input>
            <span>2</span>
            <input onClick={this.updateUrgency} name="urgency" type="radio" value="2"></input>
            <span>3</span>
            <input onClick={this.updateUrgency} name="urgency" type="radio" value="3"></input>
            <span>4</span>
            <input onClick={this.updateUrgency} name="urgency" type="radio" value="4"></input>
            <span>5</span>
            <input onClick={this.updateUrgency} name="urgency" type="radio" value="5"></input>
          </div>
          <br></br>
          <ControlLabel className="message">Please provide any information about the bug that we may use to help you:</ControlLabel>
          <br></br>
          <FormControl componentClass="textarea" onChange={this.updateMessage}type="text" placeholder="Additional information..."></FormControl>
          <br></br>
          <Button bsStyle="primary" onClick={this.onSubmit}>Submit Message</Button>

        </div>

      </div>
    );
  }
}

Submission.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  showAdminResponses: PropTypes.func.isRequired,
};

export default Submission;
