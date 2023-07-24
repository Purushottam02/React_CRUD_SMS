import "./style/EditStudent.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HEDER_TEXT } from "../constant";
import { editStudentDetails, getStudentDetails } from "../services/service";
import { setEditStudentData } from "./redux/actions/studentsActions";

const Editstudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.students.editStudentForm);
  const { rollNo } = useParams();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentData = await getStudentDetails(rollNo);
        dispatch(setEditStudentData(studentData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentDetails();
  }, [dispatch, rollNo]);

  if (!student) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditStudentData({ ...student, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editStudentDetails(rollNo, student);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(HEDER_TEXT).map((field) => {
        if (field !== "rollNo" && field !== "edit" && field !== "delete") {
          return (
            <div key={field}>
              <label>
                {HEDER_TEXT[field]}:
                <input
                  type="text"
                  name={field}
                  value={student[field]}
                  onChange={handleChange}
                />
              </label>
              <br />
            </div>
          );
        }
        return null;
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Editstudent;
