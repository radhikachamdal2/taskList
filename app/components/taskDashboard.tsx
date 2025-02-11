"use client";

import { Button, Alert, Snackbar } from "@mui/material";
import TaskTable from "./taskTable";
import { allTasks, taskHeaders, addNewTaskFields } from "../mockData/mockData";
import { useState, useCallback, useEffect } from "react";
import Dialog from "./dialog";
import DialogData from "./dialogData";

type Task = {
  id: number;
  title: string;
  description: string[];
  status: string;
};

const TaskDashboard = () => {
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      const parseTasks: Task[] = storedTasks
        ? JSON.parse(storedTasks)
        : allTasks;
      setTasks(parseTasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setTasks([]);
    }
  }, []);

  const [addNewDialog, setAddNewDialog] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

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
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={() => setAddNewDialog(true)}
          aria-label="Open add new task dialog"
        >
          Add New Task
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={updateTask}
          aria-label="Check selected task as complete"
        >
          Complete Task{" "}
        </Button>
      </div>

      <TaskTable
        selectedTask={selectedTask}
        checkboxHandler={checkboxHandler}
        taskHeaders={taskHeaders}
        tasks={tasks}
      />
      <Dialog
        open={addNewDialog}
        handleClose={() => {
          setAddNewDialog(false);
        }}
        title="Add new task"
        contentText="To add a new task below, please fill out all the fields!"
      >
        <DialogData
          tasks={tasks}
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
      </Dialog>
    </>
  );
};

export default TaskDashboard;
