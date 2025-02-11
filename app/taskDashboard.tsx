"use client";

import { Button } from "@mui/material";
import TaskTable from "./components/taskTable";
import { allTasks, taskHeaders, addNewTaskFields } from "./mockData";
import { useState, useCallback, useEffect } from "react";
import Dialog from "./components/dialog";
import DialogData from "./components/dialogData";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const TaskDashboard = () => {
  const fetchStoredTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [addNewDialog, setAddNewDialog] = useState<boolean>(false);
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
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

  return (
    <>
      <Button onClick={() => setAddNewDialog(true)}>Open new dialog </Button>
      <Button onClick={updateTask}>Complete Task </Button>
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
          <DialogData
            tasks={tasks}
            setTasks={setTasks}
            headers={addNewTaskFields}
            handleClose={() => {
              setAddNewDialog(false);
            }}
          />
        }
      />
    </>
  );
};

export default TaskDashboard;
