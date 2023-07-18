import React, { useState, useEffect } from "react";
import { editStudentDetails, getStudentDetails } from "../service";
import { useNavigate, useParams } from "react-router-dom";
import "./style/EditStudent.scss";
import { HEDER_TEXT } from "../constant";

const Editstudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    gender: "",
    physics: "",
    maths: "",
    english: "",
  });
  const { rollNo } = useParams();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentData = await getStudentDetails(rollNo);
        setStudent(studentData);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchStudentDetails();
  }, [rollNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editStudentDetails(rollNo, student);
      navigate("/");
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(HEDER_TEXT).map((field) => {
        if (field !== "edit" && field !== "delete") {
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
