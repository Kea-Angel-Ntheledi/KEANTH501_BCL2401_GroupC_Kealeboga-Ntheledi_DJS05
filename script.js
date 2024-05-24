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


// Define the reducer
const tallyReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
};

// Define the Store class
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = []; //an empty array
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

// Instantiate the store
const store = new Store(tallyReducer, initialState);

// Subscribe to state changes to log the state
store.subscribe(() => console.log("State:", store.getState()));

// Initial state logging
console.log("Initial State:", store.getState());

// Dispatching actions to demonstrate state changes
store.dispatch(increment()); // Should log: State: { count: 1 }
store.dispatch(increment()); // Should log: State: { count: 2 }
store.dispatch(decrement()); // Should log: State: { count: 1 }
store.dispatch(reset()); // Should log: State: { count: 0 }
