import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ToggleButtonsProps {
  showCompleted: boolean;
  setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  showCompleted,
  setShowCompleted,
}) => {
  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setShowCompleted(newValue === "completed");
    }
  };

  return (
    <ToggleButtonGroup
      value={showCompleted ? "completed" : "all"}
      exclusive
      onChange={handleToggle}
      aria-label="View Tasks"
    >
      <ToggleButton value="completed" aria-label="View Completed Tasks">
        View Filtered Tasks
      </ToggleButton>
      <ToggleButton value="all" aria-label="View All Tasks">
        All Tasks
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
