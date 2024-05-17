import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer';
import { friendReducer } from './reducers/friendReducer';
import { messageReducer } from "./reducers/messageReducer"
import { requestReducer } from './reducers/requestReducer';


const reducer = combineReducers({
  user: userReducer,
  request: requestReducer,
  friend: friendReducer,
  message: messageReducer,
});


let preloadedState = {

};


const store = configureStore({
  reducer, preloadedState,
});

export default store;