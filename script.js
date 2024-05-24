const createStore = (initialState, reducer) => {
  let state = initialState;
  const listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  return { dispatch, getState, subscribe };
};


// Define the reducer
const reducer = (state = { count: 0}, action) => {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 };
    case 'SUBTRACT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

// Create the store with the initial state and reducer
const store = createStore({ count: 0 }, reducer);

  // Subscribe to state changes to log the state
store.subscribe(() => console.log('State:', store.getState()));

// Initial state logging
console.log('Initial State:', store.getState());

// Dispatching actions to demonstrate state changes
store.dispatch({ type: 'ADD' }); // Should log: State: { count: 1 }
store.dispatch({ type: 'ADD' }); // Should log: State: { count: 2 }
store.dispatch({ type: 'SUBTRACT' }); // Should log: State: { count: 1 }
store.dispatch({ type: 'RESET' });     // Should log: State: { count: 0 }