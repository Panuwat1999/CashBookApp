import { combineReducers } from "redux";
import counterReducer from "./Reducers/counterReducer";
import itemsReducer from "./Reducers/itemsReducer";
import loginReducer from "./Reducers/loginReducer";

const rootReducer = combineReducers({
  // your reducers go here
  counter: counterReducer,
  items: itemsReducer,
  userlogin: loginReducer,
});

export default rootReducer;
