import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createStudents } from "../service";

function Addstudent() {
  const Navigate = useNavigate();

  const [inputData, setInputData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      createStudents(inputData);
    } catch (error) {
      console.error(error);
    }
    Navigate('/')
  };

  const handleInputChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="Container">
        <form onSubmit={handleSubmit}>
          {/* <div className="name">
            Enter RollNo
            <span>
              <input
                name="rollNo"
                type="text"
                value={inputData.rollNo}
                onChange={handleInputChange}
              />
            </span>
          </div> */}
          <div className="name">
            Enter Name
            <span>
              <input
                name="name"
                type="text"
                value={inputData.name}
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
                value={inputData.gender}
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
                value={inputData.physics}
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
                value={inputData.maths}
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
                value={inputData.english}
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
