import { combineReducers } from 'redux';

//Import the actions types constant we defined in our actions
import { DATA_AVAILABLE } from "../actions/";

//Import Reducers
import ordersReducer from './orders';

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
                state = Object.assign({}, state, { data: action.data, loading:false });
                return state;
        default:
                return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
   dataReducer, ordersReducer
})

export default rootReducer;