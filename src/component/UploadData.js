import React, { useState, useEffect } from "react";
import axios from "axios";
import { getStudents } from "../service";
import { useNavigate } from "react-router-dom";

function UploadData() {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);

  const init = async () => {
    const student = await getStudents();
    setData(student);
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

      const response = await axios.put(
        "http://localhost:8000/students/upload",
        formData
      );

      init(); // Refresh student data after successful upload
    } catch (error) {
      console.log("Error:", error);
    }
    Navigate("/");
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
}

export default UploadData;
