export const taskHeaders = ["", "Task", "Description", "Status"];

export const allTasks = [
  {
    id: 1,
    title: "Complete React Project",
    description: [
      "Finish the user authentication flow and integrate with the backend.",
    ],
    status: "In Progress",
  },
  {
    id: 2,
    title: "Design Task Management UI",
    description: [
      "Create wireframes for the task management app with a clean and intuitive design.",
    ],
    status: "Not Started",
  },
  {
    id: 3,
    title: "Write Unit Tests for API",
    description: [
      "Write unit tests for the API endpoints using Jest and React Testing Library.",
    ],
    status: "In Progress",
  },
  {
    id: 4,
    title: "Refactor TaskList Component",
    description: [
      "Improve the performance of the TaskList component and clean up the code.",
    ],
    status: "Not Started",
  },
  {
    id: 5,
    title: "Deploy App to Production",
    description: [
      "Push the final build to production and ensure the CI/CD pipeline works correctly.",
    ],
    status: "In Progress",
  },
  {
    id: 6,
    title: "Update Documentation",
    description: [
      "Update README and developer documentation to reflect the latest changes and features.",
    ],
    status: "In Progress",
  },
  {
    id: 7,
    title: "Implement Search Functionality",
    description: [
      "Add search functionality to filter tasks based on title and description.",
    ],
    status: "Not Started",
  },
  {
    id: 8,
    title: "Fix Bug in Task Details Page",
    description: [
      "Resolve issue where task details are not displaying correctly on mobile devices.",
    ],
    status: "In Progress",
  },
  {
    id: 9,
    title: "Implement User Role Permissions",
    description: [
      "Add role-based permissions for users (admin, manager, user) to restrict access to certain features.",
    ],
    status: "In Progress",
  },
  {
    id: 10,
    title: "Integrate Email Notifications",
    description: [
      "Set up email notifications for task updates (assigned, due date reminder, completed).",
    ],
    status: "Not Started",
  },
];

export const addNewTaskFields = [
  {
    title: "Title",
    description: [""],
    type: "text",
    value: "",
  },
  {
    title: "Description",
    description: [""],
    type: "textarea",
    value: "",
  },
  {
    title: "Status",
    description: ["In Progress", "Not Started"],
    type: "select",
    value: "",
  },
];
