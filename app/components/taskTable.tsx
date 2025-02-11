"use client";
import {
  Paper,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Checkbox,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useCallback, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string[];
  status: string;
};

interface TaskTableProps {
  tasks: Task[];
  taskHeaders: string[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  checkboxHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    task: Task
  ) => void;
  selectedTask: Task | null;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  taskHeaders,
  setTasks,
  checkboxHandler,
  selectedTask,
}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {taskHeaders?.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTask?.id === item.id}
                  onChange={(event) => checkboxHandler(event, item)}
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
