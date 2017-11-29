import React from 'react';
import AdminView from '../client/src/components/admin/adminView.jsx';
import Message from '../client/src/components/admin/message.jsx';
import Response from '../client/src/components/admin/response.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

/*TEST ADMIN COMPONENTS*/

// describe('Component: Message', () => {
//   const message = {
//     createdAt: '2017-11-25T15:13:29.000Z',
//     first_name: 'Brad',
//     last_name: 'Pitt',
//     user_contact: 'the quick brown fox',
//     user_message: 'jumped over the lazy dog',
//     user_urgency: '2'
//   };

//   it('should match its empty snapshot', () => {
//     const component = shallow( <Message message={message}/>);

//     expect(component).toMatchSnapshot();
//   });

// });

describe('Component: AdminView', () => {
  const showLogIn = () => {
    console.log('show log in');
  };
  const retrieveOpenMessages = () => {
    console.log('retrieve open messages');
  };
  
  it('should match its empty snapshot', () => {
    const component = shallow( <AdminView showLogIn={showLogIn} retrieveOpenMessages={retrieveOpenMessages}/>);

    expect(component).toMatchSnapshot();
  });

});

describe('Component: Response', () => {
  const messageName = 'Brad Pitt';
  const messageId = 2;
  const submitAdminResponse = () => {
    console.log('submit admin response');
  };
  
  it('should match its empty snapshot', () => {
    const component = shallow( <Response messageName={messageName} messageId={messageId} submitAdminResponse={submitAdminResponse}/>);

    expect(component).toMatchSnapshot();
  });

});
