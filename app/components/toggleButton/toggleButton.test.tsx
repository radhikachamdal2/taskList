import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToggleButtons from "./toggleButton";

describe("ToggleButtons Component", () => {
  it("renders correctly", () => {
    render(
      <ToggleButtons showCompleted={false} setShowCompleted={jest.fn()} />
    );

    expect(screen.getByLabelText("View All Tasks")).toBeInTheDocument();
    expect(screen.getByLabelText("View Completed Tasks")).toBeInTheDocument();
  });

  it("sets showCompleted to true when 'View Filtered Tasks' is clicked", () => {
    const setShowCompleted = jest.fn();
    render(
      <ToggleButtons
        showCompleted={false}
        setShowCompleted={setShowCompleted}
      />
    );

    fireEvent.click(screen.getByLabelText("View Completed Tasks"));
    expect(setShowCompleted).toHaveBeenCalledWith(true);
  });

  it("sets showCompleted to false when 'View All Tasks' is clicked", () => {
    const setShowCompleted = jest.fn();
    render(
      <ToggleButtons showCompleted={true} setShowCompleted={setShowCompleted} />
    );

    fireEvent.click(screen.getByLabelText("View All Tasks"));
    expect(setShowCompleted).toHaveBeenCalledWith(false);
  });

  it("shows the correct button as selected based on showCompleted", () => {
    const { rerender } = render(
      <ToggleButtons showCompleted={false} setShowCompleted={jest.fn()} />
    );

    expect(screen.getByLabelText("View All Tasks")).toHaveClass("Mui-selected");

    rerender(
      <ToggleButtons showCompleted={true} setShowCompleted={jest.fn()} />
    );
    expect(screen.getByLabelText("View Completed Tasks")).toHaveClass(
      "Mui-selected"
    );
  });
});
