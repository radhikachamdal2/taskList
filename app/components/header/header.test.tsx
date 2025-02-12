import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  const headerText = "My Task Dashboard";

  it("renders the navigation header text", () => {
    render(<Header navigationHeader={headerText} />);

    expect(screen.getByText(headerText)).toBeInTheDocument();
  });

  it("renders the Avatar component", () => {
    render(<Header navigationHeader={headerText} />);

    const avatarText = screen.getByText("R");
    expect(avatarText).toBeInTheDocument();
  });

  it("renders AppBar, Toolbar, and Typography structure correctly", () => {
    render(<Header navigationHeader={headerText} />);

    const appBar = screen.getByRole("banner");
    const toolbar = screen.getByTestId("toolbar");
    const typography = screen.getByText(headerText);

    expect(appBar).toBeInTheDocument();
    expect(toolbar).toBeInTheDocument();
    expect(typography).toBeInTheDocument();
  });
});
