import "./style/StudentDetails.scss";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../service";
import { useParams } from "react-router-dom";

const text = "this is unique key";
function StudentDetails() {
  const [data, setData] = useState([]);
  const { rollNo } = useParams();

  const init = async () => {
    const student = await getStudentDetails(rollNo);
    setData(student);
  };

  useEffect(() => {
    init();
  }, [rollNo]);
  return (
    <div className="box">
      <>
        <div>RollNo:{data.rollNo}</div>
        <br />
        <div>Name:{data.name}</div>
        <br />
        <div>Gender:{data.gender}</div>
        <br />
        <div>Physics:{data.physics}</div>
        <br />
        <div>Maths:{data.maths}</div>
        <br />
        <div>English:{data.english}</div>
      </>
    </div>
  );
}

export default StudentDetails;

