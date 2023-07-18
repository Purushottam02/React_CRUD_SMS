import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { createStudents } from "../service";
import Addstudent from "./Add.js";
import { useNavigate } from "react-router-dom";

jest.mock("../service");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Addstudent", () => {
  it("submits form with correct data and redirects", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    createStudents.mockResolvedValue();

    render(<Addstudent />);

    const nameInput = screen.getByLabelText("Enter Name");
    const genderInput = screen.getByLabelText("Enter Gender");
    const physicsInput = screen.getByLabelText("Enter Physics");
    const mathsInput = screen.getByLabelText("Enter Maths");
    const englishInput = screen.getByLabelText("Enter English");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(genderInput, { target: { value: "Male" } });
    fireEvent.change(physicsInput, { target: { value: "90" } });
    fireEvent.change(mathsInput, { target: { value: "85" } });
    fireEvent.change(englishInput, { target: { value: "92" } });
    fireEvent.click(submitButton);

    expect(createStudents).toHaveBeenCalledTimes(1);
    expect(createStudents).toHaveBeenCalledWith({
      name: "John Doe",
      gender: "Male",
      physics: "90",
      maths: "85",
      english: "92",
    });

    await screen.findByText("Loading..."); // Assuming there's a loading state indicator

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");

    // You can also assert other things like clearing input values if required
  });
});
