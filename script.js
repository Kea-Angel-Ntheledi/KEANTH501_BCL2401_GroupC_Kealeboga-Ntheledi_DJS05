//Define action types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

//Define action creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });

//Define the initial state
const initialState = { count: 0};

//Define the reducer
const tallyReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 };
            case DECREMENT:
                return { count: state.count -1 };
                case RESET:
                    return { count: 0 };
                    default:
                        return state;
    }
};

//Define the store class
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.lesteners = [];
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

//Instantiate the store
const store = new Store(tallyReducer, initialState);

//Subscribe to state changes to log the state
store.subscribe(() => console.log("State:", store.getState()));

//Initial state logging
console.log("Initial State:", store.getState());

//Dispatching actions  to demonstrate state changes
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(reset());