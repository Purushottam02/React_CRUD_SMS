import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentTable from "./component/Student";
import AddStudent from "./component/AddStudent";
import StudentDetails from "./component/StudentDetails";
import EditStudent from "./component/EditStudent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/details/:rollNo" element={<StudentDetails />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:rollNo" element={<EditStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
