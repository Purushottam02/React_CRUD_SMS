import "./style/Student.css";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../service";
import { useParams } from "react-router-dom";

const text = "this is unique key";
function StudentDetails() {
  const [data, setData] = useState({});
  const { rollNo } = useParams();

  const init = async () => {
    const student = await getStudentDetails(rollNo);
    setData(student);
  };

  useEffect(() => {
    init();
  }, [rollNo]);
  console.log(data);
  return (
    <div className="container">
      <>
        <label>RollNo:{data.rollNo}</label>
        <br />
        <label>Name:{data.name}</label>
        <br />
        <label>Gender:{data.gender}</label>
        <br />
        <label>Physics:{data.physics}</label>
        <br />
        <label>Maths:{data.maths}</label>
        <br />
        <label>English:{data.english}</label>
      </>
    </div>
  );
}

export default StudentDetails;
