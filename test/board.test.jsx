import React from 'react';
import { shallow } from 'enzyme';
import Game from '../client/src/components/user/tictactoeView/game';
import { Board, HotSquare } from '../client/src/components/user/tictactoeView/board';

/* TEST GAME COMPONENT */

describe('Component: Game', () => {
  it('should match its empty snapshot', () => {
    const component = shallow(<Game unlockForms={() => {}} />);
    expect(component).toMatchSnapshot();
  });
});


describe('Component: Board', () => {
  const squares = Array(9).fill(null);

  const handleClick = (i) => {
    console.log('click handled: ', i);
  };

  const unlockForms = () => {
    console.log('forms have been unlocked!');
  };

  it('should match its empty snapshot', () => {
    const component = shallow((
      <Board squares={squares} onClick={handleClick} unlockForms={unlockForms} value="x" />
    ));
    expect(component).toMatchSnapshot();
  });
});

describe('Component: Hot Button', () => {
  const value = 'X';
  const handleClick = (i) => {
    console.log('click handled: ', i);
  };
  it('should match its empty snapshot', () => {
    const component = shallow(<HotSquare value={value} onClick={handleClick} />);
    expect(component).toMatchSnapshot();
  });
});
