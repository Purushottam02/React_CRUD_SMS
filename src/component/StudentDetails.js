import "./style/StudentDetails.scss";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../service";
import { useParams } from "react-router-dom";
import { DISPLAY_MAP } from "../constant";

function StudentDetails() {
  const [students, setStudents] = useState();
  const { rollNo } = useParams();

  useEffect(() => {
    const init = async () => {
      const student = await getStudentDetails(rollNo);
      setStudents(student);
    };

    init();
  }, [rollNo]);

  return (
    <div className="box-wrapper">
      <div className="box">
        <div className="details">
          {students &&
            Object.keys(students).map((field) => (
              <div key={field} className="row">
                <span className="field">{DISPLAY_MAP[field]}:</span>
                <span className="value">{students[field]}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
