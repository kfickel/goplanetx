import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';

class Response extends React.Component {
  constructor(props) {
    super(props);
  }

  // Render all admin responses for this user in reverse chronological order of original message submission date
  render() {
    return (
      <div className="admin-response-container group">
        <div className="response-contents group">
          <span className="message-created-at">Created: </span><p>{moment(this.props.response.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
          <br></br>
          <span className="message-body">Your original message: </span><p>{this.props.response.user_message}</p>
          <br></br>
          <span className="response-body">Response: </span><p>{this.props.response.admin_response !== null ? this.props.response.admin_response : 'No response yet; keep checking back'}</p>
        </div>
        <div className="response-actions group">
          <Button bsSize="small" bsStyle="primary" onClick={this.props.showSubmissionForm}>Respond to Message</Button>
        </div>
      </div>
    );
  }
}

export default Response;
