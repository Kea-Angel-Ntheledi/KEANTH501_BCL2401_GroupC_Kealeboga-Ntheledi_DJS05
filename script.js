const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });

const initialState = { count: 0};

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
    };

    ubscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((1) => 1 !== listener);
        };
    }
}

const store = new Store(tallyReducer, initialState);