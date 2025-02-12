import TaskDashboard from "./components/taskDashboard/TaskDashboard";
import Header from "./components/header/Header";

export default function Home() {
  return (
    <div style={{ padding: "1em" }}>
      <Header navigationHeader="Task Board" />
      <TaskDashboard />
      <footer></footer>
    </div>
  );
}
