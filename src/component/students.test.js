import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import StudentDetails from "./StudentDetails";
import { getStudentDetails } from "../service";

jest.mock("../service");

test("renders StudentDetails component with student details", async () => {
  const mockStudent = {
    rollNo: "123",
    name: "John Doe",
    gender:"Male",
    physics:56,
    maths:56,
    english:67
  };

  getStudentDetails.mockResolvedValue(mockStudent);

  const app = render(<StudentDetails/>);

  // Wait for async tasks to complete
  await waitFor(() => expect(getStudentDetails).toHaveBeenCalledTimes(1));
  const rollNo = app.container.querySelector(".details");
  expect(rollNo).toBe("");
//   expect(screen.getByText("rollNo: 123")).toBeInTheDocument();
//   expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
//   expect(screen.getByText("Age: 20")).toBeInTheDocument();
//   expect(screen.getByText("Grade: A")).toBeInTheDocument();
});
