import "./style/Student.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteStudent, getStudents } from "../service";
import Paginate from "./Paginate";
import SearchBar from "./Search";
import UploadData from "./UploadData";
import {HEDER_TEXT } from "../constant";
import getTopScoreRollNo from "../utils";

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
          {Object.keys(HEDER_TEXT).map((field) => {
            return (
              <div key={field} className="row">
                <span className="field">{HEDER_TEXT[field]}</span>
              </div>
            );
          })}
        </div>
        <div className="container">
          {tableData.map((student, i) => {
            var isMaxScore = student.rollNo == MaxScoreRollNo;
            const {rollNo,name,gender,physics,maths,english}=student
            return (
              <div className={isMaxScore ? "table max-score" : "table"} key={`${text}${i}`}>
                <a className="rollNo" href="#" onClick={() => StudentDetails(rollNo)}>{student.rollNo}</a>
                <div className="name">{name}</div>
                <div className="gender">{gender}</div>
                <div className="physics">{physics}</div>
                <div className="maths">{maths}</div>
                <div className="english">{english}</div>
                <div className="editdetails" onClick={() => EditDetails(rollNo)}>✎</div>
                <div className={student.isDeleting ? "disable" : ""} onClick={() => deleteStudentAction(rollNo, i)}>🗑</div>
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
