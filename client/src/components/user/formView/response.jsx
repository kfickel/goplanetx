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

  const more = (
    <span className="moreText" role="presentation" onClick={props.showText} >
      {props.hide ? 'more...' : 'less...'}
    </span>
  );

  const messageToggle = (message) => {
    if (props.hide && message.length > 99) {
      return (<p>{message.slice(0, 100)}{more}</p>);
    } else if (!props.hide && message.length > 99) {
      return (<p>{message}{more}</p>);
    }
    return message;
  };

  // Render all admin responses for this user in reverse
  // chronological order of original message submission date
  return (
    <div className={`admin-response-container group 
          ${props.response.admin_response ? 'response ' : ''}
          ${props.response.admin_complete ? 'complete' : ''}`}
    >
      <div className="response-contents group">
        <span className="message-created-at">Created: </span>
        <p>{moment(props.response.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
        <span className="message-body">
          Your original message:
        </span>
        <p className="user-message-body">{messageToggle(props.response.user_message)}</p>
        <span className="response-body">Response: </span>
        {adminResponse()}
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
    updatedAt: PropTypes.string,
    user_message: PropTypes.string,
    admin_response: PropTypes.string,
    admin_complete: PropTypes.boolean,
  }).isRequired,
  showSubmissionForm: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  showText: PropTypes.func.isRequired,
};

export default Response;
