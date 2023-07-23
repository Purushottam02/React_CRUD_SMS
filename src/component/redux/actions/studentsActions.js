import { ActionTypes } from "../constants/action-types";

export const setStudentList = (studentList) => {
  return {
    type: ActionTypes.SET_STUDENTS,
    payload: studentList,
  };
};

export const setFormData = (formData) => {
  return {
    type: ActionTypes.SET_FORM_DATA,
    payload: formData,
  };
};
export const setEditStudentData = (editStudentData) => {
  return {
    type: ActionTypes.SET_STUDENT_DATA,
    payload: editStudentData,
  };
};
