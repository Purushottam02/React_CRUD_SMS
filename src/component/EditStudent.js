import React, { useState, useEffect } from "react";
import { editStudentDetails, getStudentDetails } from "../service";
import { useNavigate, useParams } from "react-router-dom";

const Editstudent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { rollNo } = useParams();

  const init = async () => {
    const student = await getStudentDetails(rollNo);
    setData(student);
  };

  useEffect(() => {
    init();
  }, [rollNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editStudentDetails(rollNo, data);
    navigate("/");
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={data.gender}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        physics:
        <input
          type="text"
          name="physics"
          value={data.physics}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Maths:
        <input
          type="text"
          name="maths"
          value={data.maths}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        English:
        <input
          type="text"
          name="english"
          value={data.english}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Editstudent;
