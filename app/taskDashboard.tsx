"use client";

import { Button } from "@mui/material";
import TaskTable from "./components/taskTable";
import { allTasks, taskHeaders, addNewTaskFields } from "./mockData";
import { useState, useCallback } from "react";
import Dialog from "./components/dialog";
import DialogData from "./components/dialogData";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [addNewDialog, setAddNewDialog] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

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

  const updateTask = () => {
    if (selectedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id ? { ...task, status: "Complete" } : task
        )
      );
      console.log(selectedTask, "updated task", tasks);
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
            data={addNewTaskFields}
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
