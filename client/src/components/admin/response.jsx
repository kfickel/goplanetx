import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
    };
    this.updateResponse = this.updateResponse.bind(this);
    this.sendResponse = this.sendResponse.bind(this);
  }

  // when admin types a response, updates state variable response
  updateResponse(e) {
    this.setState({
      response: e.target.value,
    });
  }

  submitAdminResponse(id, response) {
    console.log('RESPONSE', response);
    $.ajax({
      method: 'PATCH',
      url: '/submissions',
      data: {
        id,
        admin_response: response,
      },
      success: (data) => {
        console.log(data);
        alert('Your response was sent successfully');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // when admin submits a response,
  // calls the submitAdminResponse method to send id and response to server as a patch request
  sendResponse() {
  // console.log(`RESPONSE VARS:  ${this.props.messageId},
  // ${this.state.response}, ${this.props.messageName}`);
    this.submitAdminResponse(this.props.messageId, this.state.response);
  }

  render() {
    // console.log('RESPONSE PROPS', this.props);
    return (
      <FormGroup>
        <div>Respond to {this.props.messageName}&apos;s message:</div>
        <FormControl
          componentClass="textarea"
          onChange={this.updateResponse}
          type="text"
          placeholder="Response..."
        />
        <br />
        <Button
          bsStyle="primary"
          onClick={this.sendResponse}
        >
        Submit Response
        </Button>
      </FormGroup>
    );
  }
}

Response.propTypes = {
  messageName: PropTypes.string.isRequired,
  messageId: PropTypes.number.isRequired,
};

export default Response;
