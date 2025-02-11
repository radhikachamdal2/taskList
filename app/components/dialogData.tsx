import { Button, TextField, MenuItem } from "@mui/material";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

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
}

const DialogData: React.FC<DialogDataProps> = ({
  headers,
  handleClose,
  tasks,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  console.log(errors, "errors");

  const submitHandler = useCallback(
    (data: Record<string, string>) => {
      const newTask = {
        id: tasks.length + 1,
        title: data.title,
        description: Array.isArray(data.description)
          ? data.description
          : [data.description],
        status: data.status,
      };

      onSubmit(newTask);
    },

    [tasks, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {headers?.map((item, index) =>
        item.type !== "select" ? (
          <Controller
            key={index}
            name={item.title.toLowerCase()}
            control={control}
            rules={{
              required: `${item.title} is required`,
            }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                sx={{ width: "80%", padding: "10px" }}
                id={item.title}
                name={item.title}
                label={item.title}
                variant="standard"
                error={!!errors[item.title.toLowerCase()]}
                value={controllerField.value || ""}
                helperText={errors[item.title.toLowerCase()]?.message || " "}
              />
            )}
          />
        ) : (
          <Controller
            key={index}
            name={item.title.toLowerCase()}
            control={control}
            rules={{ required: `${item.title} is required` }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                sx={{ width: "80%", padding: "10px" }}
                id={item.title}
                name={item.title}
                select
                label={item.title}
                variant="standard"
                value={controllerField.value || ""}
                error={!!errors[item.title.toLowerCase()]}
                helperText={errors[item.title.toLowerCase()]?.message || " "}
              >
                {Array.isArray(item.description) &&
                  item.description?.map((status: string) => (
                    <MenuItem key={status} value={status || ""}>
                      {status}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
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
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default DialogData;
