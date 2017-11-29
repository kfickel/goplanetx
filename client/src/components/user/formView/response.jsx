import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';

function Response(props) {
  const adminResponse = () => {
    if (props.response.admin_response !== null) {
      return props.response.admin_response;
    }
    return 'No response yet; keep checking back';
  };
  // Render all admin responses for this user in reverse
  // chronological order of original message submission date
  return (
    <div className="admin-response-container group">
      <div className="response-contents group">
        <span className="message-created-at">Created: </span>
        <p>{moment(props.response.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
        <br />
        <span className="message-body">
          Your original message:
        </span>
        <p>{props.response.user_message}</p>
        <br />
        <span className="response-body">Response: </span>
        <p>{adminResponse()}</p>
      </div>
      <div className="response-actions group">
        <Button
          bsSize="small"
          bsStyle="primary"
          onClick={props.showSubmissionForm}
        >
          Respond to Message
        </Button>
      </div>
    </div>
  );
}

Response.propTypes = {
  response: PropTypes.shape({
    updatedAt: PropTypes.instanceOf(Date),
    user_message: PropTypes.string,
    admin_response: PropTypes.string,
  }).isRequired,
  showSubmissionForm: PropTypes.func.isRequired,
};

export default Response;
