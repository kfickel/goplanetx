import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Button, SplitButton, MenuItem } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import Message from './message';


class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // example data for mocking
      messages: [
        {
          id: 1,
          createdAt: '2017-11-30T00:49:35.000Z',
          first_name: 'Jane',
          last_name: 'Smith',
          user_message: 'Test message',
          user_contact: 'Test contact info',
          user_urgency: 3,
        },
        {
          id: 2,
          createdAt: '2017-11-30T00:49:35.000Z',
          first_name: 'Lady',
          last_name: 'Person',
          user_message: 'Test message 2',
          user_contact: 'Test contact info 2',
          user_urgency: 1,
        },
      ],
      messageId: null,
      search: '',
      sort: { by: 'createdAt', order: -1 },
      // response: '',
    };
    this.setResponseId = this.setResponseId.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  componentDidMount() {
    const retrieve = () => {
      this.props.retrieveOpenMessages((data) => {
        this.setState({
          // may have to change 'data' depending on format
          messages: data,
        });
      });
    };
    retrieve();
    setInterval(() => {
      retrieve();
    }, 3000);
  }


  //  sets state variable messageId to currently selected message's id
  setResponseId(id) {
    this.setState({
      messageId: id,
    });
  }

  addEmail() {
    const email = prompt('Add your email');
    $.ajax({
      method: 'PATCH',
      url: '/email',
      data: {
        username: this.props.username,
        email,
      },
      success: () => {
        alert('Your response was sent successfully');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleSort(e) {
    const sort = Object.assign({}, this.state.sort);

    sort.by = e.target.getAttribute('id');
    sort.order = sort.by === 'createdAt' ? -1 : 1;

    this.setState({ sort });
  }

  toggleOrder() {
    const sort = Object.assign({}, this.state.sort);
    sort.order *= -1;

    this.setState({ sort });
  }

  submitAdminResponse(response) {
    $.ajax({
      method: 'PATCH',
      url: '/submissions',
      data: {
        id: this.state.messageId,
        admin_response: response,
      },
      success: () => {
        alert('Your response was sent successfully');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  searchFilter(e) {
    this.setState({
      search: e.target.value,
    });
  }

  // calls the markAsComplete method in index.jsx to send id and status to server


  render() {
    return (
      <div>
        <Button
          onClick={() => this.props.showLogIn()}
          className="admin-change-user-button"
          bsSize="small"
          bsStyle="primary"
        >
          Logout
        </Button>
        <Button
          onClick={this.addEmail}
          className="admin-change-user-button"
          bsSize="small"
          bsStyle="primary"
        >
          Click for email notifications
        </Button>
        <div className="admin-header group">
          <h3 className="welcome-header">Welcome to Your Inbox!</h3>
          <h4>You can view and respond to user messages here.</h4>
        </div>
        <div className="message-container-header">
          <SplitButton
            title="Order"
            id="message-sort"
            onClick={this.toggleOrder}
            onSelect={(e, ekey) => this.handleSort(ekey)}
          >
            <MenuItem id="createdAt">Created</MenuItem>
            <MenuItem id="first_name">First Name</MenuItem>
            <MenuItem id="last_name">Last Name</MenuItem>
            <MenuItem id="user_urgency">Urgency</MenuItem>
          </SplitButton>
          <div className="admin-msg-search">
            <input
              id="adminMessageSearch"
              type="text"
              placeholder="Search..."
              onChange={this.searchFilter}
            />
          </div>
        </div>
        <ul className="user-message-ul">
          <FlipMove>
            {this.state.messages
              .filter(message => (
                message.user_message.toLowerCase().includes(this.state.search.toLowerCase())
                || (`${message.first_name.toLowerCase()} ${message.last_name.toLowerCase()}`).includes(this.state.search.toLowerCase())
              ))
              .sort((a, b) => (
                this.state.sort.order * (a[this.state.sort.by] < b[this.state.sort.by] ? -1 : 1)
              ))
              .map(message => (
                <Message
                  submitAdminResponse={this.submitAdminResponse}
                  key={message.id}
                  message={message}
                  setResponseId={this.setResponseId}
                />
            ))}
          </FlipMove>
        </ul>

      </div>
    );
  }
}

AdminView.propTypes = {
  retrieveOpenMessages: PropTypes.func.isRequired,
  showLogIn: PropTypes.func.isRequired,
  username: PropTypes.string,
};

AdminView.defaultProps = {
  username: '',
};

export default AdminView;
