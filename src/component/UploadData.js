import React, { useState } from "react";
import axios from "axios";

function UploadData() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put("http://localhost:8000/students/upload", formData);
      console.log(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Convert</button>
    </div>
  );
}

export default UploadData;
