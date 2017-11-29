import React from 'react';
import Login from '../client/src/components/user/formView/login.jsx';
import Signup from '../client/src/components/user/formView/signup.jsx';
import Response from '../client/src/components/user/formView/response.jsx';
import Submission from '../client/src/components/user/formView/submission.jsx';
import UserResponses from '../client/src/components/user/formView/userResponses.jsx';
import { shallow } from 'enzyme';

describe('Login component renders correctly', () => {
  const logInUser = () => {
    console.log('testing logInUser function');
  }

  const showSignUp = () => {
    console.log('testing showSignUp function');
  }

  it ('should match its empty snapshot', () => {
    const component = shallow(<Login logInUser={logInUser} showSignUp={showSignUp} />)
  })
});


describe('Signup component renders correctly', () => {
  const createUser = () => {
    console.log('testing createUser function');
  }

  const showLogIn = () => {
    console.log('testing showLogIn function');
  }

  it ('should match its empty snapshot', () => {
    const component = shallow(<Signup createUser={createUser} showLogIn={showLogIn} />)
  })
});


describe('Submission component renders correctly', () => {
  const username = 'testUser';

  const sendMessage = () => {
    console.log('testing sendMessage function');    
  }

  const retrieveResponses = () => {
    console.log('testing retrieveResponses function');
  }

  const showAdminResponses = () => {
    console.log('testing showAdminResponses function');
  }

  it ('should match its empty snapshot', () => {
    const component = shallow(<Submission username={username} sendMessage={sendMessage} retrieveResponses={retrieveResponses} showAdminResponses={showAdminResponses} />)
  })
});


describe('UserResponses component renders correctly', () => {
  const showSubmissionForm = () => {
    console.log('testing showSubmissionForm function');    
  }

  const retrieveResponses = () => {
    console.log('testing retrieveResponses function');
  }

  const username = 'testUser';

  it ('should match its empty snapshot', () => {
    const component = shallow(<UserResponses showSubmissionForm={showSubmissionForm} retrieveResponses={retrieveResponses} username={username} />)
  })
});


describe('Response component renders correctly', () => {
  const showSubmissionForm = () => {
    console.log('testing showSubmissionForm function');
  }

  const key = 1;

  const response = {
    createdAt: '2017-11-25T15:13:29.000Z',
    first_name: 'Brad',
    last_name: 'Pitt',
    user_contact: 'the quick brown fox',
    user_message: 'jumped over the lazy dog',
    user_urgency: '2'
  };

  it ('should match its empty snapshot', () => {
    const component = shallow(<Response showSubmissionForm={showSubmissionForm} key={key} response={response} />)
  })
});