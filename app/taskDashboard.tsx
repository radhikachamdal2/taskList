"use client";

import { Button, Alert, Snackbar } from "@mui/material";
import TaskTable from "./components/taskTable";
import { allTasks, taskHeaders, addNewTaskFields } from "./mockData";
import { useState, useCallback, useEffect } from "react";
import Dialog from "./components/dialog";
import DialogData from "./components/dialogData";

type Task = {
  id: number;
  title: string;
  description: string[];
  status: string;
};

const TaskDashboard = () => {
  const fetchStoredTasks = () => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : allTasks;
    }
    return allTasks;
  };

  const [addNewDialog, setAddNewDialog] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(fetchStoredTasks);

  const checkboxHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, singleTask: Task) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setSelectedTask(singleTask);
      } else {
        setSelectedTask(null);
      }
    },
    []
  );

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const updateTask = () => {
    if (selectedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id ? { ...task, status: "Complete" } : task
        )
      );
    } else {
      setSelectedTask(null);
    }
  };

  const onSubmit = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAlert(true);
    setAddNewDialog(false);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "20px",
        }}
      >
        <Button variant="contained" onClick={() => setAddNewDialog(true)}>
          Open new dialog{" "}
        </Button>
        <Button variant="contained" onClick={updateTask}>
          Complete Task{" "}
        </Button>
      </div>

      <TaskTable
        selectedTask={selectedTask}
        checkboxHandler={checkboxHandler}
        taskHeaders={taskHeaders}
        tasks={tasks}
        setTasks={setTasks}
      />
      <Dialog
        open={addNewDialog}
        handleClose={() => {
          setAddNewDialog(false);
        }}
        title="Add new task"
        children={
          <>
            <DialogData
              tasks={tasks}
              setTasks={setTasks}
              headers={addNewTaskFields}
              onSubmit={onSubmit}
              handleClose={() => {
                setAddNewDialog(false);
              }}
            />
            <Snackbar
              open={showAlert}
              autoHideDuration={3000}
              onClose={() => {
                setShowAlert(false);
              }}
            >
              <Alert
                onClose={() => {
                  setShowAlert(false);
                }}
                severity="success"
                sx={{ width: "100%" }}
              >
                New Task Added
              </Alert>
            </Snackbar>
          </>
        }
      />
    </>
  );
};

export default TaskDashboard;
