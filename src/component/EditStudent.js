import React, { useState, useEffect } from "react";
import { editStudentDetails, getStudentDetails } from "../service";
import { useNavigate, useParams } from "react-router-dom";

const Editstudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const { rollNo } = useParams();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const student = await getStudentDetails(rollNo);
      setStudent(student);
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
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={student.gender}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Physics:
        <input
          type="text"
          name="physics"
          value={student.physics}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Maths:
        <input
          type="text"
          name="maths"
          value={student.maths}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        English:
        <input
          type="text"
          name="english"
          value={student.english}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Editstudent;
