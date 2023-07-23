import { combineReducers } from "redux";
import { studentReducer } from "./studentReducer";
import paginationSlice from "../slices/paginationSlice";
// import paginationReducer from "./slices/paginationSlice";
const reducers = combineReducers({
  students: studentReducer,
  pagination: paginationSlice,
});
export default reducers;
