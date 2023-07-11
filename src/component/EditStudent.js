import React, { useState, useEffect } from "react";
import { editStudentDetails, getStudentDetails } from "../service";
import { useNavigate, useParams } from "react-router-dom";

const Editstudent = () => {
  const navigate = useNavigate();
  const [students, setstudents] = useState({});
  const { rollNo } = useParams();

  const init = async () => {
    const student = await getStudentDetails(rollNo);
    setstudents(student);
  };

  useEffect(() => {
    init();
  }, [rollNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstudents((students) => ({
      ...students,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editStudentDetails(rollNo, students);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={students.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={students.gender}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        physics:
        <input
          type="text"
          name="physics"
          value={students.physics}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Maths:
        <input
          type="text"
          name="maths"
          value={students.maths}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        English:
        <input
          type="text"
          name="english"
          value={students.english}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Editstudent;
