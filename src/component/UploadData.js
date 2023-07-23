import React, { useState, useEffect } from "react";
import { getStudents } from "../service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStudentList } from "./redux/actions/studentsActions";

function UploadData() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  
  const init = async () => {
    const response = await getStudents();
    dispatch(setStudentList(response));
  };

  useEffect(() => {
    init();
  }, []);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/students/upload", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        init();
      } else {
        console.error("Error:", response.statusText);
      }
      Navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
}

export default UploadData;
