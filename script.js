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
}
