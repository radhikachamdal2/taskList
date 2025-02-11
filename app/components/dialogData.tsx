import { Button, TextField, Snackbar, Alert, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";

interface DialogDataProps {
  data: Array<{
    title: string;
    description: string;
    type: string;
  }>;
  handleClose?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  tasks: Array<{
    id: number;
    title: string;
    description: string;
    status: string;
  }>;
  setTasks: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: number;
        title: string;
        description: string;
        status: string;
      }>
    >
  >;
}

const DialogData: React.FC<DialogDataProps> = ({
  data,
  handleClose,
  setTasks,
  tasks,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(() =>
    data.reduce((acc, item) => {
      acc[item.title.toLowerCase()] = "";
      return acc;
    }, {} as { [key: string]: string })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name.toLowerCase()]: value,
    }));
  };

  const handleSubmit = () => {
    const newTask = {
      id: tasks.length + 1,
      ...formData,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div style={{ alignItems: "center", width: "100%" }}>
      {data?.map((item, index) =>
        item.type !== "select" ? (
          <TextField
            sx={{ width: "80%", padding: "10px" }}
            id={item.title}
            name={item.title}
            key={index}
            label={item.title}
            variant="standard"
            onChange={handleChange}
            value={formData[item.title.toLowerCase()] || ""}
          />
        ) : (
          <TextField
            sx={{ width: "80%", padding: "10px" }}
            id={item.title}
            name={item.title}
            select
            key={index}
            label={item.title}
            variant="standard"
            onChange={handleChange}
            value={formData[item.title.toLowerCase()] || ""}
          >
            {Array.isArray(item.description) &&
              item.description?.map((status: string, index: number) => (
                <MenuItem key={status} value={status || ""}>
                  {status}
                </MenuItem>
              ))}
          </TextField>
        )
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "20px",
        }}
      >
        <Button
          sx={{ backgroundColor: "black", textTransform: "none" }}
          variant={"contained"}
          type="submit"
          color="primary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          sx={{ backgroundColor: "black", textTransform: "none" }}
          variant={"contained"}
          type="submit"
          color="primary"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default DialogData;
