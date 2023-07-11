import "./style/Student.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteStudent, getStudents } from "../service";
import Paginate from "./Paginate";
import SearchBar from "./Search";
import UploadData from "./UploadData";
import getTopScoreRollNo from "./utils/GetMax";

const header = [
  "Roll No",
  "Student Name",
  "Gender",
  "Physics",
  "Maths",
  "English",
  "Edit",
  "Delete",
];
const text = "this is unique key";

function StudentTable() {
  const [data, setData] = useState([]);
  const init = async () => {
    const student = await getStudents();
    setData(student);
  };
  useEffect(() => {
    init();
  }, []);
  const pagesize = ["2", "5", "6", "10"];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSelect, setPageSelect] = useState(5);
  const [searchText, setSearchText] = useState("");

  const indexOfLastitem = currentPage * pageSelect;
  const indexOfFirstitem = indexOfLastitem - pageSelect;
  const currentPosts = data.slice(indexOfFirstitem, indexOfLastitem);

  const handlechangePage = (e) => {
    e.preventDefault();
    setPageSelect(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let tableData = currentPosts;
  if (searchText.length) {
    tableData = data.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  let navigate = useNavigate();

  const Addstudent = () => {
    let path = `/add`;
    navigate(path);
  };
  const StudentDetails = (rollNo) => {
    let path = `/Details/${rollNo}`;
    navigate(path);
  };
  const EditDetails = (rollNo) => {
    let path = `/edit/${rollNo}`;
    navigate(path);
  };
  const deleteStudentAction = async (studentId, index) => {
    data[index].isDeleting = true;
    setData([...data]);
    await deleteStudent(studentId);
    init();
  };
  const MaxScoreRollNo = getTopScoreRollNo(data);

  return (
    <>
      <div className="options">
        <div>
          <button onClick={Addstudent}>Add Student</button>
        </div>
        <div className="pageselector">
          <select name="items" value={pageSelect} onChange={handlechangePage}>
            {pagesize.map((index, lable) => {
              return (
                <option key={lable} value={`${index}`}>{`${index}`}</option>
              );
            })}
          </select>
        </div>
        <div>
          <SearchBar
            onSearchInputChange={(text) => {
              setSearchText(text);
            }}
          />
        </div>
      </div>

      <div className="student-table">
        <div className="table-hader">
          {header.map((index, label) => {
            return (
              <div
                className="hader-text"
                key={`${text}${label}`}
              >{`${index}`}</div>
            );
          })}
        </div>
        <div className="container">
          {tableData.map((student, i) => {
            var isMaxScore = student.rollNo == MaxScoreRollNo;

            return (
              <div
                className={isMaxScore ? "table max-score" : "table"}
                key={`${text}${i}`}
              >
                <div
                  className="rollNo"
                  onClick={() => StudentDetails(student.rollNo)}
                >
                  {student.rollNo}
                </div>
                <div className="name">{student.name}</div>
                <div className="gender">{student.gender}</div>
                <div className="physics">{student.physics}</div>
                <div className="maths">{student.maths}</div>
                <div className="english">{student.english}</div>
                <div
                  className="editdetails"
                  onClick={() => EditDetails(student.rollNo)}
                >
                  ✎
                </div>
                <div
                  className={student.isDeleting ? "disable" : ""}
                  onClick={() => deleteStudentAction(student.rollNo, i)}
                >
                  🗑
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="paginate">
        <Paginate
          postsPerPage={pageSelect}
          totalPosts={data.length}
          paginate={paginate}
        />
      </div>
      <div>
        <UploadData />
      </div>
    </>
  );
}

export default StudentTable;
