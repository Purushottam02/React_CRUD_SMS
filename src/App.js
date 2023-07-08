import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentTable from "./component/Student";
import Addstudent from "./component/Add";
import StudentDetails from "./component/StudentDetails";
import EditStudent from "./component/EditStudent";
function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/details/:rollNo" element={<StudentDetails />} />
          <Route path="/add" element={<Addstudent />} />
          <Route path="/edit/:rollNo" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
