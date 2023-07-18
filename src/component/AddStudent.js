import "./style/AddStudent.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HEDER_TEXT } from "../constant";
import { createStudents } from "../service";
import UploadData from "./UploadData";

function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      createStudents(formData);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const filteredFields = Object.keys(HEDER_TEXT).filter(
    (field) => field !== "rollNo" && field !== "edit" && field !== "delete"
  );

  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        {filteredFields.map((field) => (
          <div key={field} className={field}>
            {HEDER_TEXT[field]}
            <span>
              <input
                name={field}
                type="text"
                value={formData[field] || ""}
                onChange={handleInputChange}
              />
            </span>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <label>Add Multiple Student Details</label>
      <div className="uploaddata">
        <UploadData />
      </div>
    </div>
  );
}

export default AddStudent;
