import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskTable from "./TaskTable";

describe("TaskTable Component", () => {
  const mockTasks = [
    {
      id: 1,
      title: "Task 1",
      description: ["Description 1"],
      status: "Not Started",
    },
    {
      id: 2,
      title: "Task 2",
      description: ["Description 2"],
      status: "In Progress",
    },
    {
      id: 3,
      title: "Task 3",
      description: ["Description 3"],
      status: "Complete",
    },
  ];

  const mockTaskHeaders = ["Select", "Title", "Description", "Status"];
  const mockCheckboxHandler = jest.fn();
  const mockSelectedTask = null;

  it("renders task table headers", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        taskHeaders={mockTaskHeaders}
        checkboxHandler={mockCheckboxHandler}
        selectedTask={mockSelectedTask}
      />
    );

    mockTaskHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders task rows correctly", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        taskHeaders={mockTaskHeaders}
        checkboxHandler={mockCheckboxHandler}
        selectedTask={mockSelectedTask}
      />
    );

    mockTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description[0])).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
    });
  });

  it("calls checkboxHandler when a checkbox is clicked", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        taskHeaders={mockTaskHeaders}
        checkboxHandler={mockCheckboxHandler}
        selectedTask={mockSelectedTask}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    expect(mockCheckboxHandler).toHaveBeenCalledTimes(1);
  });

  it("applies the correct background color based on task status", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        taskHeaders={mockTaskHeaders}
        checkboxHandler={mockCheckboxHandler}
        selectedTask={mockSelectedTask}
      />
    );

    expect(screen.getByText("Not Started")).toHaveStyle(
      "background-color: #cc2204"
    );
    expect(screen.getByText("In Progress")).toHaveStyle(
      "background-color: #fcba03"
    );
    expect(screen.getByText("Complete")).toHaveStyle(
      "background-color: #2ea314"
    );
  });
});
