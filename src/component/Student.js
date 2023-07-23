import "./style/Student.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteStudent, getStudents } from "../service";
import Paginate from "./Paginate";
import SearchBar from "./Search";
import { HEDER_TEXT } from "../constant";
import { convertToJSONWithoutCircular, getTopScoreRollNo } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setStudentList } from "./redux/actions/studentsActions";
import { setCurrentPage, setPageSelect } from "./redux/slices/paginationSlice";

const text = "this is unique key";

function StudentTable() {
  const studentList = useSelector((state) => state.students.studentList);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const pageSelect = useSelector((state) => state.pagination.pageSelect);
  // const searchText = useSelector((state) => state.pagination.searchText);

  const dispatch = useDispatch();
  const init = async () => {
    const response = await getStudents();
    dispatch(setStudentList(response));
  };

  useEffect(() => {
    init();
  }, []);

  const pagesize = ["2", "5", "6", "10"];

  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSelect, setPageSelect] = useState(5);
  const [searchText, setSearchText] = useState("");

  const indexOfLastitem = currentPage * pageSelect;
  const indexOfFirstitem = indexOfLastitem - pageSelect;
  const currentPosts = studentList.slice(indexOfFirstitem, indexOfLastitem);

  const handlechangePage = (e) => {
    e.preventDefault();
    dispatch(setPageSelect(e.target.value));
  };

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  let tableData = currentPosts;
  if (searchText.length) {
    tableData = studentList.filter((item) => {
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
    try {
      const updatedStudentList = [...studentList];
      updatedStudentList[index] = {
        ...updatedStudentList[index],
        isDeleting: true,
      };

      // You can log the JSON string representation for debugging
      const jsonString = convertToJSONWithoutCircular(updatedStudentList);
      console.log(jsonString);

      dispatch(setStudentList(updatedStudentList));
      await new Promise((resolve) => setTimeout(resolve, 500));
      await deleteStudent(studentId);

      // After deletion, create a new filtered list without the deleted student
      const filteredStudentList = updatedStudentList.filter(
        (_, i) => i !== index
      );

      // Update the Redux store with the new list
      dispatch(setStudentList(filteredStudentList));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const MaxScoreRollNo = getTopScoreRollNo(studentList);

  return (
    <div className="wrapper">
      <div className="options">
        <div>
          <button onClick={Addstudent}>Add Student</button>
        </div>
        <div>
          <SearchBar
            onSearchInputChange={(text) => {
              setSearchText(text);
            }}
          />
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
            const { rollNo, name, gender, physics, maths, english } = student;
            return (
              <div
                className={isMaxScore ? "table max-score" : "table"}
                key={`${text}${i}`}
              >
                <a
                  className="rollNo"
                  href="#"
                  onClick={() => StudentDetails(rollNo)}
                >
                  {student.rollNo}
                </a>
                <div className="name">{name}</div>
                <div className="gender">{gender}</div>
                <div className="physics">{physics}</div>
                <div className="maths">{maths}</div>
                <div className="english">{english}</div>
                <div
                  className="editdetails"
                  onClick={() => EditDetails(rollNo)}
                >
                  ✎
                </div>
                <div
                  className={student.isDeleting ? "disable" : "delete"}
                  onClick={() => deleteStudentAction(rollNo, i)}
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
          totalPosts={studentList.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default StudentTable;
