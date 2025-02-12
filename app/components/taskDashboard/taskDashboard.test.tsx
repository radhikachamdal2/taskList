import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskDashboard from "./TaskDashboard";

describe("TaskDashboard Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the Add New Task button", () => {
    render(<TaskDashboard />);
    expect(
      screen.getByRole("button", { name: /add new task/i })
    ).toBeInTheDocument();
  });

  it("renders the Complete Task button", () => {
    render(<TaskDashboard />);
    expect(
      screen.getByRole("button", { name: /complete task/i })
    ).toBeInTheDocument();
  });

  it("opens the add new task dialog when clicking Add New Task button", () => {
    render(<TaskDashboard />);
    fireEvent.click(screen.getByRole("button", { name: /add new task/i }));
    expect(screen.getByText(/add new task/i)).toBeInTheDocument();
  });

  it("closes the add new task dialog when clicking Close", async () => {
    render(<TaskDashboard />);
    fireEvent.click(screen.getByRole("button", { name: /add new task/i }));
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    await waitFor(() =>
      expect(screen.queryByText(/add new task/i)).not.toBeInTheDocument()
    );
  });

  it("saves tasks to localStorage", async () => {
    render(<TaskDashboard />);
    fireEvent.click(screen.getByRole("button", { name: /add new task/i }));

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      expect(tasks.length).toBeGreaterThan(0);
    });
  });
});
