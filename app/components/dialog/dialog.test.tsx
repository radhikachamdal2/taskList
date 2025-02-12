import React from "react";
import { render, screen } from "@testing-library/react";
import Dialog from "./Dialog";
import "@testing-library/jest-dom";

describe("Dialog Component", () => {
  const mockHandleClose = jest.fn();

  const defaultProps = {
    title: "Test Dialog",
    contentText: "This is a test dialog",
    open: true,
    handleClose: mockHandleClose,
    children: <p>Dialog Content</p>,
  };

  test("renders the dialog with the correct title and content", () => {
    render(<Dialog {...defaultProps} />);

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("This is a test dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });

  test("does not render when open is false", () => {
    render(<Dialog {...defaultProps} open={false} />);

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("This is a test dialog")).not.toBeInTheDocument();
  });
});
