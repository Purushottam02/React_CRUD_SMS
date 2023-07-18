import "./style/StudentDetails.scss";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../service";
import { useParams } from "react-router-dom";
import { HEDER_TEXT } from "../constant";

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
      <div className="details">
        {students &&
          Object.keys(HEDER_TEXT).map((field) => {
            if (field !== "edit" && field !== "delete") {
              return (
                <div key={field} className="row">
                  <span>{HEDER_TEXT[field]}:</span>
                  <span className="value">{students[field]}</span>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}

export default StudentDetails;
