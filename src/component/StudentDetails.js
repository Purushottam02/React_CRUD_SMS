import "./style/StudentDetails.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentDetails } from "../services/service";
import { useParams } from "react-router-dom";
import { HEDER_TEXT } from "../constant";
import { setStudentDetails } from "./redux/actions/studentsActions";
function StudentDetails() {
  const students = useSelector((state) => state.students.studentDetails);
  const dispatch = useDispatch();
  const { rollNo } = useParams();
  useEffect(() => {
    const init = async () => {
      const student = await getStudentDetails(rollNo);
      dispatch(setStudentDetails(student));
    };
    init();
  }, [dispatch, rollNo]);
  console.log(students);
  return (
    <div className="box-wrapper">
      <div className="details">
        {students &&
          Object.keys(HEDER_TEXT).map((field) => {
            if (field !== "edit" && field !== "delete") {
              return (
                <div key={field} className="row">
                  <span>{HEDER_TEXT[field]}:</span>
                  <span className="value">{students[field]}</span>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
export default StudentDetails;
