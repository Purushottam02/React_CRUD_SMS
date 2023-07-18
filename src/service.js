import axios from "axios";
export async function getStudents() {
  const response = await axios.get("http://localhost:8000/students", {
    params: {},
  });
  return response.data;
}
export async function createStudents(student) {
  const response = await fetch("http://localhost:8000/students", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data;
}

export async function getStudentDetails(rollNo) {
  try {
    const response = await fetch(
      `http://localhost:8000/students/details/${rollNo}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching student details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteStudent(studentId) {
  const response = await fetch(`http://localhost:8000/students/${studentId}`, {
    method: "DELETE",
    body: JSON.stringify(studentId),
  });
  const students = await response.text();
  return students;
}

export async function editStudentDetails(rollNo, formData) {
  try {
    const response = await fetch(
      `http://localhost:8000/students/edit/${rollNo}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Error updating form data");
    }

    console.log("Form data updated successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
