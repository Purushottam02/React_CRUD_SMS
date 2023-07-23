// AddStudent.js

import "./style/AddStudent.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HEDER_TEXT } from "../constant";
import { createStudents } from "../service";
import UploadData from "./UploadData";
import { setFormData } from "./redux/actions/studentsActions";

function AddStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.students.formData);

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
    dispatch(setFormData({ ...formData, [name]: value }));
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
