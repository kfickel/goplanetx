import React from 'react';
import { shallow } from 'enzyme';
import Login from '../client/src/components/user/formView/login';
import Signup from '../client/src/components/user/formView/signup';
import Response from '../client/src/components/user/formView/response';
import Submission from '../client/src/components/user/formView/submission';
import UserResponses from '../client/src/components/user/formView/userResponses';

describe('Login component renders correctly', () => {
  const logInUser = () => {
    console.log('testing logInUser function');
  };

  const showSignUp = () => {
    console.log('testing showSignUp function');
  };

  it('should match its empty snapshot', () => {
    const component = shallow(<Login logInUser={logInUser} showSignUp={showSignUp} />);
    expect(component).toMatchSnapshot();
  });
});


describe('Signup component renders correctly', () => {
  const createUser = () => {
    console.log('testing createUser function');
  };

  const showLogIn = () => {
    console.log('testing showLogIn function');
  };

  it('should match its empty snapshot', () => {
    const component = shallow(<Signup createUser={createUser} showLogIn={showLogIn} />);
    expect(component).toMatchSnapshot();
  });
});


describe('Submission component renders correctly', () => {
  const sendMessage = () => {
    console.log('testing sendMessage function');
  };

  const retrieveResponses = () => {
    console.log('testing retrieveResponses function');
  };

  const showAdminResponses = () => {
    console.log('testing showAdminResponses function');
  };

  it('should match its empty snapshot', () => {
    const component = shallow((
      <Submission
        retrieveResponses={retrieveResponses}
        showAdminResponses={showAdminResponses}
        sendMessage={sendMessage}
      />
    ));
    expect(component).toMatchSnapshot();
  });
});


describe('UserResponses component renders correctly', () => {
  const showSubmissionForm = () => {
    console.log('testing showSubmissionForm function');
  };

  const retrieveResponses = () => {
    console.log('testing retrieveResponses function');
  };

  const username = 'testUser';

  it('should match its empty snapshot', () => {
    const component = shallow((
      <UserResponses
        showSubmissionForm={showSubmissionForm}
        retrieveResponses={retrieveResponses}
        username={username}
      />
    ));
    expect(component).toMatchSnapshot();
  });
});


xdescribe('Response component renders correctly', () => {
  const showSubmissionForm = () => {
    console.log('testing showSubmissionForm function');
  };

  const key = 1;

  const response = {
    createdAt: '2017-11-25T15:13:29.000Z',
    first_name: 'Brad',
    last_name: 'Pitt',
    user_contact: 'the quick brown fox',
    user_message: 'jumped over the lazy dog',
    user_urgency: '2',
  };

  it('should match its empty snapshot', () => {
    const component = shallow((
      <Response showSubmissionForm={showSubmissionForm} key={key} response={response} />
    ));
    expect(component).toMatchSnapshot();
  });
});
