import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DialogData from "./dialogData";
import { allTasks, addNewTaskFields } from "../../mockData/mockData";

test("calls onSubmit with correct data", async () => {
  const mockOnSubmit = jest.fn();

  render(
    <DialogData
      tasks={allTasks}
      headers={addNewTaskFields}
      onSubmit={mockOnSubmit}
      handleClose={jest.fn()}
    />
  );

  // Find the form fields based on the labels or names from `addNewTaskFields`
  const titleInput = screen.getByLabelText(/title/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const statusInput = screen.getByLabelText(/status/i);

  fireEvent.change(titleInput, { target: { value: "New Task" } });
  fireEvent.change(descriptionInput, {
    target: { value: "Task description here" },
  });

  fireEvent.mouseDown(statusInput);
  const inProgressOption = await screen.findByText(/in progress/i);
  fireEvent.click(inProgressOption);

  const submitButton = screen.getByRole("button", { name: /add/i });
  fireEvent.click(submitButton);

  await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));

  expect(mockOnSubmit).toHaveBeenCalledWith({
    id: allTasks.length + 1,
    title: "New Task",
    description: ["Task description here"],
    status: "In Progress",
  });
});
