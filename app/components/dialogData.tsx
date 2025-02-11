import { Button, TextField, Snackbar, Alert, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./dialogData.module.css";

interface DialogDataProps {
  headers: Array<{
    title: string;
    description: string[];
    type: string;
  }>;
  handleClose?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmit: (newTask: {
    id: number;
    title: string;
    description: string[];
    status: string;
  }) => void;
  tasks: Array<{
    id: number;
    title: string;
    description: string[];
    status: string;
  }>;
  setTasks: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: number;
        title: string;
        description: string[];
        status: string;
      }>
    >
  >;
}

const DialogData: React.FC<DialogDataProps> = ({
  headers,
  handleClose,
  setTasks,
  tasks,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(() =>
    headers.reduce((acc, item) => {
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
      title: formData.title,
      description: Array.isArray(formData.description)
        ? formData.description
        : [formData.description],
      status: formData.status,
    };

    onSubmit(newTask);
  };

  return (
    <div className={styles.wrapper}>
      {headers?.map((item, index) =>
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
