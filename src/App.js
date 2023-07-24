import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentTable from "./component/Student";
import AddStudent from "./component/AddStudent";
import StudentDetails from "./component/StudentDetails";
import EditStudent from "./component/EditStudent";
import Login from "./component/Login";
import Register from "./component/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<StudentTable />} />
          <Route path="/details/:rollNo" element={<StudentDetails />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:rollNo" element={<EditStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
