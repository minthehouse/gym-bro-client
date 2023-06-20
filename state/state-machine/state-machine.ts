import { Machine } from 'xstate';

// Define the states and transitions of your state machine
const stateMachine = Machine({
  id: 'navigation',
  initial: 'home',
  states: {
    home: {
      on: {
        about: 'about',
        contact: 'contact',
      },
    },
    about: {
      on: {
        home: 'home',
        contact: 'contact',
      },
    },
    contact: {
      on: {
        home: 'home',
        about: 'about',
      },
    },
  },
});

export { stateMachine };
