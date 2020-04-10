import loginReducer from "./LoginReducer";
import counterReducer from "./CounterReducer";
import { combineReducers } from "redux";

let rootReducer = combineReducers({
  isLogin: loginReducer,
  counter: counterReducer
})
export default rootReducer;
