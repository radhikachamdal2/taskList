import TaskDashboard from "./components/taskDashboard";
import Header from "./components/header";

export default function Home() {
  return (
    <div style={{ padding: "1em" }}>
      <Header navigationHeader="Task Board" />
      <TaskDashboard />
      <footer></footer>
    </div>
  );
}
