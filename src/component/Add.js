import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createStudents } from "../service";

function Addstudent() {
  const Navigate = useNavigate();

  const [formData, setformData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      createStudents(formData);
    } catch (error) {
      console.error(error);
    }
    Navigate("/");
  };

  const handleInputChange = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="Container">
        <form onSubmit={handleSubmit}>
          <div className="name">
            Enter Name
            <span>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
            </span>
          </div>
          <div className="gender">
            Enter Gender
            <span>
              <input
                name="gender"
                type="text"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </span>
          </div>
          <div className="physics">
            Enter Physics
            <span>
              <input
                name="physics"
                type="text"
                value={formData.physics}
                onChange={handleInputChange}
              />
            </span>
          </div>
          <div className="maths">
            Enter Maths
            <span>
              <input
                name="maths"
                type="text"
                value={formData.maths}
                onChange={handleInputChange}
              />
            </span>
          </div>
          <div className="english">
            Enter English
            <span>
              <input
                name="english"
                type="text"
                value={formData.english}
                onChange={handleInputChange}
              />
            </span>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
export default Addstudent;
