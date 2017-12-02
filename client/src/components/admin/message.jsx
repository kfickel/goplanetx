import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import moment from 'moment';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import Response from './response';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageId: null,
      messageName: `${props.message.first_name} ${props.message.last_name}`,
      showResponseForm: false,
      hide: true,
    };
    this.markAsComplete = this.markAsComplete.bind(this);
    this.onRespondClick = this.onRespondClick.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messageId: nextProps.message.id,
      messageName: `${nextProps.message.first_name} ${nextProps.message.last_name}`,
    });
  }


  // Call initiateResponse in adminView with this message's id
  // Nice to have: indicate which response is being responded to
  onRespondClick() {
    this.props.setResponseId(this.state.messageId);
    this.setState({
      showResponseForm: !this.state.showResponseForm,
    });
    // if (this.props.message.admin_response === null) {
    //   alert('null');
    // }
  }

  showMessage() {
    this.setState({
      hide: !this.state.hide,
    });
  }

  markAsComplete(id) {
    $.ajax({
      method: 'PATCH',
      url: '/submissions',
      data: {
        id,
        admin_complete: true,
      },
      success: () => {
        alert('This messages has been marked as complete. It will no longer appear in your inbox.');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Render all open user messages in reverse chrono order
  // Nice to have: order by urgency
  render() {
    const more = (
      <span className="moreText" role="presentation" onClick={this.showMessage}>
        {this.state.hide ? 'more...' : 'less...'}
      </span>
    );

    const messageToggle = (message) => {
      if (this.state.hide && message.length > 99) {
        return (<p>{message.slice(0, 100)}{more}</p>);
      } else if (!this.state.hide && message.length > 99) {
        return (<p>{message}{more}</p>);
      }
      return <p>message</p>;
    };

    if (this.state.showResponseForm) {
      return (
        <div className="user-message-container group">
          <div className="message-contents group">
            <span className="message-created-at">Created: </span><p>{moment(this.props.message.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
            <span className="message-name">Name: </span>
            <p>{this.props.message.first_name} {this.props.message.last_name}</p>
            <span className="message-urgency">Urgency: </span>
            <p>{this.props.message.user_urgency}</p>
            <span className="message-contact">Contact Information: </span>
            <p>{this.props.message.user_contact}</p>
            <span className="message-body">Message: </span>
            <p className="user-message-body">{this.props.message.user_message}</p>
          </div>
          <div className="message-actions group">
            <Checkbox
              onClick={() => this.markAsComplete(this.props.message.id)}
              type="checkbox"
            >
            Case Complete
            </Checkbox>
            <Button
              bsStyle="primary"
              onClick={this.onRespondClick}
              className="admin-response-button"
            >
            Hide Response Form
            </Button>
          </div>
          <div className="message-response group">
            <Response
              messageName={this.state.messageName}
              messageId={this.state.messageId}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="user-message-container group">
        <div className="message-contents group">
          <span className="message-created-at">Created: </span><p>{moment(this.props.message.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
          <span className="message-name">Name: </span>
          <p>{this.props.message.first_name} {this.props.message.last_name}</p>
          <span className="message-urgency">Urgency: </span>
          <p>{this.props.message.user_urgency}</p>
          <span className="message-contact">Contact Information: </span>
          <p>{this.props.message.user_contact}</p>
          <span className="message-body">Message: </span>
          {messageToggle(this.props.message.user_message)}
          <span className="message-body">Your Response: </span>
          <p>{this.props.message.admin_response !== null ? this.props.message.admin_response : 'You still need to response to this message'}</p>
        </div>
        <div className="message-actions group">
          <Checkbox
            onClick={() => this.markAsComplete(this.props.message.id)}
            type="checkbox"
          >
          Case Complete
          </Checkbox>
          <Button
            bsStyle="primary"
            onClick={this.onRespondClick}
            className="admin-response-button"
          >
            Show Response Form
          </Button>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    user_urgency: PropTypes.number,
    user_contact: PropTypes.string,
    user_message: PropTypes.string,
    admin_response: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  setResponseId: PropTypes.func.isRequired,
};

export default Message;
