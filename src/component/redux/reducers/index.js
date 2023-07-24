import { combineReducers } from "redux";
import { studentReducer } from "./studentReducer";
import paginationSlice from "../slices/paginationSlice";
import { authReducer } from "./authReducer";
// import paginationReducer from "./slices/paginationSlice";
const reducers = combineReducers({
  students: studentReducer,
  pagination: paginationSlice,
  authorisation:authReducer,
});
export default reducers;
